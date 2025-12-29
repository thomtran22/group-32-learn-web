import cron from "node-cron";
import Order from "../models/OrderModel.js";

// Chạy mỗi giờ (0 * * * *)
cron.schedule("0 * * * *", async () => {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  try {
    const result = await Order.updateMany(
      {
        status: "Delivered",
        deliveredAt: { $lte: threeDaysAgo }, // Giao thành công trước 3 ngày trước
      },
      {
        $set: { status: "Completed", completedAt: new Date() },
      }
    );
    if (result.modifiedCount > 0) {
      console.log(`Auto-completed ${result.modifiedCount} orders.`);
    }
  } catch (error) {
    console.error("Cron job error:", error);
  }
});
