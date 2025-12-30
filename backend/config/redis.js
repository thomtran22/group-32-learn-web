import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

let redisClient = null;

// Chỉ khởi tạo nếu có biến môi trường REDIS_URI
if (process.env.REDIS_URI) {
    console.log("🔌 Initializing Redis Client...");
    
    redisClient = createClient({
        url: process.env.REDIS_URI,
        socket: {
            // --- QUAN TRỌNG: Cấu hình giữ kết nối ---
            keepAlive: 5000, // Gửi gói tin giữ kết nối mỗi 5s (tránh bị server đóng do idle)
            connectTimeout: 10000, // Thời gian chờ kết nối tối đa 10s
            reconnectStrategy: (retries) => {
                // Chiến thuật kết nối lại:
                // Nếu thử quá 10 lần mà không được -> Trả về lỗi (dừng thử để tránh spam log)
                // Ngược lại, chờ thời gian tăng dần: 100ms, 200ms, ..., tối đa 3000ms
                if (retries > 10) {
                    console.error("❌ Redis: Max retries reached. Stopping reconnection.");
                    return new Error("Redis connection failed");
                }
                const delay = Math.min(retries * 100, 3000);
                console.log(`♻️ Redis: Reconnecting in ${delay}ms...`);
                return delay;
            }
        }
    });

    // --- Xử lý sự kiện (Để không crash app) ---
    
    redisClient.on('error', (err) => {
        // Chỉ log lỗi, KHÔNG throw để tránh sập server Node.js
        console.error('⚠️ Redis Client Error:', err.message); 
    });

    redisClient.on('connect', () => {
        console.log('✅ Redis Connected');
    });

    redisClient.on('reconnecting', () => {
        console.log('🔄 Redis Reconnecting...');
    });

    redisClient.on('end', () => {
        console.log('❌ Redis Connection Closed');
    });

    // Kết nối
    (async () => {
        try {
            await redisClient.connect();
        } catch (err) {
            console.error("❌ Redis Initial Connection Failed:", err.message);
            // Không exit process, để app vẫn chạy bằng Database
        }
    })();
} else {
    console.warn("⚠️ REDIS_URI not found in .env. Running without Cache.");
}

export default redisClient;