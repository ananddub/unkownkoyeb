import { neon } from '@neondatabase/serverless';
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http';
const DATABASE_URL = process.env.DATABASE_URL || '';

const sql = neon(DATABASE_URL);
export const db = drizzle(sql);




