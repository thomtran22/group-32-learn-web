const ngrok = require('ngrok');
const fs = require('fs');
const path = require('path');

async function startNgrok() {
    try {
        // Khởi động ngrok tunnel
        const url = await ngrok.connect({
            proto: 'http',
            addr: 5000,
            authtoken: '2xjdYGEgAuYjruQqZ0SaxJRIuKf_4nkCAWqpBHcxPKKApdiqJ' // Thay bằng token của bạn
        });

        console.log(`✅ Ngrok tunnel started: ${url}`);

        // Cập nhật .env file
        const envPath = path.join(__dirname, '.env');
        let envContent = fs.readFileSync(envPath, 'utf8');

        // Thay đổi VNP_RETURN_URL
        envContent = envContent.replace(
            /VNP_RETURN_URL=.*/,
            `VNP_RETURN_URL=${url}/api/order/vnpay_return`
        );

        fs.writeFileSync(envPath, envContent);
        console.log(`✅ .env updated with: VNP_RETURN_URL=${url}/api/order/vnpay_return`);

    } catch (error) {
        console.error('❌ Ngrok error:', error);
        process.exit(1);
    }
}

startNgrok();
