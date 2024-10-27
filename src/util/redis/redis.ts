import 'dotenv/config';
import Redis from 'ioredis';
const host = process.env.REDIS_HOST || 'localhost';
const password = process.env.REDIS_PASS || '';
const port = process.env.REDIS_PORT || '';

function redis(): any {
    const REDIS_URL = process.env.REDIS_URL || ''
    return new Redis(REDIS_URL);
}
//
// redis.on('error', (err) => {
//     console.error('Redis connection error:', err);
// });
// redis.on('connect', () => {
//     console.log('Redis connected');
// })
export default redis;
