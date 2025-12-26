import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import ShipperInfo from "../models/ShipperInfo.js";
import Cart from "../models/CartModel.js";
import crypto from "crypto";
import querystring from "qs";
import moment from "moment";
import { get } from "http";

const createOrder = async (req, res) => {
  const userId = req.user?.id;

  const {
    orderItems, // Danh sách sản phẩm
    shippingAddress, // Địa chỉ giao hàng
    orderNotes, // Ghi chú đơn hàng
    paymentMethod, // COD / BANKING / VNPAY
  } = req.body;

  try {
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Đơn hàng không có sản phẩm nào",
      });
    }

    const productIds = orderItems.map((item) => item.productId);

    const dbProducts = await Product.find({ _id: { $in: productIds } });

    let calculatedItemsPrice = 0;
    const dbOrderItems = [];

    // Danh sách các update operation để chạy transaction hoặc bulkWrite
    const bulkUpdateOps = [];

    for (const item of orderItems) {
      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: `Số lượng không hợp lệ cho sản phẩm ID: ${item.productId}`,
        });
      }

      const dbProduct = dbProducts.find(
        (p) => p._id.toString() === item.productId
      );

      if (!dbProduct) {
        return res.status(404).json({
          success: false,
          message: `Sản phẩm không tồn tại: ${item.name}`,
        });
      }

      const variant = dbProduct.variants.find(
        (v) => v.color === item.color && v.size === item.size
      );

      // Check tồn kho lần cuối
      if (variant.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm ${dbProduct.name} (${item.color}, ${item.size}) không đủ hàng. Chỉ còn ${variant.quantity}.`,
        });
      }

      const itemPrice = dbProduct.price;
      const productImage =
        dbProduct.image ||
        (dbProduct.images && dbProduct.images[0]) ||
        "https://via.placeholder.com/150";

      calculatedItemsPrice += itemPrice * item.quantity;
      dbOrderItems.push({
        name: dbProduct.name,
        quantity: item.quantity,
        image: productImage,
        price: itemPrice,
        color: item.color,
        size: item.size,
        product: dbProduct._id,
      });

      // update trừ tồn kho
      bulkUpdateOps.push({
        updateOne: {
          filter: {
            _id: dbProduct._id,
            "variants.color": item.color,
            "variants.size": item.size,
          },
          update: {
            $inc: { "variants.$.quantity": -item.quantity },
          },
        },
      });
    }

    const shippingPrice = 0; // Logic phí ship
    const totalPrice = calculatedItemsPrice + shippingPrice;

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin giao hàng",
      });
    }

    // TẠO ĐƠN HÀNG MỚI
    const order = new Order({
      user: userId || null,
      orderItems: dbOrderItems,
      shippingAddress,
      orderNotes,
      paymentMethod,
      itemsPrice: calculatedItemsPrice, // <-- QUAN TRỌNG: Dùng biến đã tính, không dùng req.body
      shippingPrice,
      totalPrice: totalPrice, // <-- QUAN TRỌNG
      isPaid: false,
      status: "Pending",
    });

    const createdOrder = await order.save();
    //Tru ton kho
    if (bulkUpdateOps.length > 0) {
      await Product.bulkWrite(bulkUpdateOps);
    }

    if (userId) {
      const boughtProductIds = orderItems.map((item) => item.itemId);
      const userCart = await Cart.findOne({ userId }).populate(
        "items.productId"
      );

      if (userCart) {
        const remainingItems = userCart.items.filter(
          (cartItem) => !boughtProductIds.includes(cartItem._id.toString())
        );

        let newTotal = 0;
        remainingItems.forEach((item) => {
          // Nếu productId populate có giá, dùng giá hiện tại; fallback về item.price nếu có
          const price = item?.productId?.price ?? item.price ?? 0;
          newTotal += price * item.quantity;
        });

        // Tránh VersionError bằng updateOne thay vì save (bỏ qua versionKey)
        await Cart.updateOne(
          { _id: userCart._id },
          { $set: { items: remainingItems, totalAmount: newTotal } }
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi tạo đơn hàng" });
  }
};

const getOrderAvail = async (req, res) => {
  try {
    const orders = await Order.find({
      shipperId: null,
      status: { $in: ["Pending", "Processing"] },
    }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tải đơn mới" });
  }
};

const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const shipperId = req.user.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng." });
    }

    if (order.shipperId) {
      return res.status(400).json({
        success: false,
        message: "Đơn hàng này đã có người khác nhận rồi.",
      });
    }

    order.shipperId = shipperId;
    order.status = "Shipping";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Nhận đơn hàng thành công!",
      order,
    });
  } catch (error) {
    console.error("Lỗi khi nhận đơn:", error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi nhận đơn." });
  }
};

const createPaymentUrl = (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");

  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const tmnCode = process.env.VNP_TMN_CODE;
  const secretKey = process.env.VNP_HASH_SECRET;
  const vnpUrl = process.env.VNP_URL;
  const returnUrl = process.env.VNP_RETURN_URL;

  // Lấy thông tin từ request (do Frontend gửi lên sau khi tạo đơn xong)
  const { orderId, amount, bankCode, language } = req.body;

  let locale = language || "vn";
  let currCode = "VND";

  let vnp_Params = {};

  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId + "_" + moment(date).format("DDHHmmss");
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== undefined) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;

  let vnpUrlFinal =
    vnpUrl + "?" + querystring.stringify(vnp_Params, { encode: false });

  res.status(200).json({
    success: true,
    url: vnpUrlFinal,
  });
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;

    const secureHash = vnp_Params["vnp_SecureHash"];

    // Xóa các tham số hash để tính lại checksum
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    // Sắp xếp lại tham số (bắt buộc)
    vnp_Params = sortObject(vnp_Params);

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;

    const signData = querystring.stringify(vnp_Params, { encode: false });

    // Tính lại checksum để kiểm tra xem dữ liệu có bị giả mạo không
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      const vnp_TxnRef = vnp_Params["vnp_TxnRef"];
      const orderId = vnp_TxnRef.split("_")[0];

      const order = await Order.findById(orderId);

      if (!order) {
        return res.json({
          success: false,
          message: "Không tìm thấy đơn hàng trong DB",
        });
      }

      if (vnp_Params["vnp_ResponseCode"] === "00") {
        if (!order.isPaid) {
          order.isPaid = true;
          order.paidAt = Date.now();

          // Thanh toán xong thì chờ Shipper nhận đơn
          order.status = "Processing";

          order.paymentResult = {
            id: vnp_Params["vnp_TransactionNo"],
            status: "Success",
            update_time: vnp_Params["vnp_PayDate"],
            bankCode: vnp_Params["vnp_BankCode"],
          };
          await order.save();
        }

        res.json({
          success: true,
          message: "Thanh toán thành công",
          orderId: order._id,
        });
      } else {
        // Giao dịch thất bại (Khách hủy, sai thẻ, hết tiền...)
        if (!order.isPaid) {
          order.status = "Cancelled";
          order.paymentResult = {
            id: vnp_Params["vnp_TransactionNo"],
            status: "Failed",
            update_time: vnp_Params["vnp_PayDate"],
          };
          await order.save();
        }

        return res.json({
          success: false,
          message: "Giao dịch thất bại hoặc bị hủy",
          code: rspCode,
        });
      }
    } else {
      res.json({ success: false, message: "Chữ ký không hợp lệ" });
    }
  } catch (error) {
    console.error("Lỗi xác thực VNPay:", error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

const viewOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const getOrderById = async (req, res) => {
  try {
    // Lấy ID từ URL (VD: /api/orders/654abc...)
    const order = await Order.findById(req.params.id);

    if (order) {
      res.json({ success: true, order });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi Server" });
  }
};

const getShippingInfo = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "shipperId",
      "fullName"
    );
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    let shipperPhone = null;
    if (order.shipperId) {
      const info = await ShipperInfo.findOne({ userId: order.shipperId._id });
      shipperPhone = info?.phoneNumber; // Lấy phoneNumber từ bảng ShipperInfo
    }

    res.json({
      recipientName: order.shippingAddress.fullName,
      recipientPhone: order.shippingAddress.phone, // Lấy từ OrderModel
      address: `${order.shippingAddress.streetAddress}, ${order.shippingAddress.ward}, ${order.shippingAddress.district}, ${order.shippingAddress.city}`,
      shipperName: order.shipperId?.fullName || null,
      shipperPhone: shipperPhone || null, // Số điện thoại vừa tìm được ở bước 2
      status: order.status,
      orderItems: order.orderItems,
      totalPrice: order.totalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const id = req.params.orderId;
    const userId = req.user.id;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng." });
    }

    if (order.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền hủy đơn hàng này.",
      });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Không thể hủy đơn hàng vì đơn đang ở trạng thái: ${order.status}`,
      });
    }

    const bulkUpdateOps = order.orderItems.map((item) => ({
      updateOne: {
        filter: {
          _id: item.product,
          "variants.color": item.color,
          "variants.size": item.size,
        },
        update: {
          $inc: { "variants.$.quantity": item.quantity },
        },
      },
    }));

    if (bulkUpdateOps.length > 0) {
      await Product.bulkWrite(bulkUpdateOps);
    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Hủy đơn hàng thành công và đã hoàn lại số lượng vào kho.",
      order,
    });
  } catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi hủy đơn hàng." });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    // Chỉ cho phép hoàn thành khi đơn đang ở trạng thái Delivered
    if (order.status !== "Delivered") {
      return res
        .status(400)
        .json({ message: "Đơn hàng chưa được giao hoặc đã hoàn thành" });
    }

    order.status = "Completed";
    order.completedAt = Date.now();
    await order.save();

    res.json({ success: true, message: "Đơn hàng đã hoàn thành!", order });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

const receiveOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("1. Đang xử lý OrderID:", orderId);
    console.log("2. User từ Token:", req.user);

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    const userIdFromToken = req.user?._id || req.user?.id;

    if (order.user.toString() !== userIdFromToken?.toString()) {
      return res
        .status(401)
        .json({ message: "Bạn không có quyền xác nhận đơn hàng này." });
    }

    order.status = "Completed";
    order.isPaid = true;
    order.paidAt = Date.now();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();
    console.log("5. Cập nhật thành công!");

    res
      .status(200)
      .json({ message: "Xác nhận đã nhận hàng thành công!", order });
  } catch (error) {
    // In lỗi chi tiết ra terminal để bạn đọc
    console.error("LỖI CHI TIẾT TẠI BACKEND:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

export {
  createOrder,
  createPaymentUrl,
  vnpayReturn,
  viewOrders,
  getOrderById,
  getOrderAvail,
  acceptOrder,
  getShippingInfo,
  cancelOrder,
  confirmOrder,
  receiveOrder,
};
