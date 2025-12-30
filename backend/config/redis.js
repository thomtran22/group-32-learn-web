import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

let client = null;

// Chỉ khởi tạo Redis nếu có biến môi trường (để tránh lỗi khi chạy localhost mà chưa setup)
if (process.env.REDIS_URI) {
    client = createClient({
        url: process.env.REDIS_URI
    });

    client.on('error', (err) => console.error('Redis Client Error:', err));

    (async () => {
        try {
            await client.connect();
            console.log('✅ Redis Connected via Cloud/Local URI!');
        } catch (error) {
            console.error('❌ Redis Connection Failed:', error);
        }
    })();
} else {
    console.log('⚠️ REDIS_URI not found in .env. Redis caching is DISABLED.');
}

export default client;
