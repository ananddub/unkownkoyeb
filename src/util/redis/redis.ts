import 'dotenv/config';
import Redis from 'ioredis';
const host = process.env.REDIS_HOST || 'localhost';
const password = process.env.REDIS_PASS || '';
const port = process.env.REDIS_PORT || '';


const redis = new Redis("rediss://default:AU89AAIjcDFhN2ZjMDhjYTY3ODY0MzZlYjRkNjEyZDAxOTg4NTY4Y3AxMA@curious-ox-20285.upstash.io:6379");
await redis.set('foo', 'bar');
//
// redis.on('error', (err) => {
//     console.error('Redis connection error:', err);
// });
// redis.on('connect', () => {
//     console.log('Redis connected');
// })
export default redis;
