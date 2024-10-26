import 'dotenv/config';
import Redis from 'ioredis';
const host = process.env.REDIS_HOST || 'localhost';
const password = process.env.REDIS_PASS || '';
const port = process.env.REDIS_PORT || '';
const redis = new Redis({
    host: host,
    password: password,
    port: port
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});
redis.on('connect', () => {
    console.log('Redis connected');
})
export default redis;
