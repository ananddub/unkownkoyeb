import 'dotenv/config'
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
const dburl: any = process.env.DATABASE_URL
const db: any = drizzle(dburl);
const main = async () => {
    try {
        await migrate(db, { migrationsFolder: 'drizzle' });
        console.log('Migration completed');
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
};

main();
