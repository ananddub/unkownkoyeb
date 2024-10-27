import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js';
const DATABASE_URL = process.env.DATABASE_URL || '';
export function db() {
    return drizzle(DATABASE_URL);
}



