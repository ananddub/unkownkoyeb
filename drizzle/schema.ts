import {
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    boolean,

} from 'drizzle-orm/pg-core';

export const UsersTable = pgTable(
    'users',
    {
        id: serial('id').primaryKey(),
        image: text('image'),
        username: text('name').notNull().unique(),
        password: text('password').notNull(),
        email: text('email').notNull().unique(),
        role: text('role').default('user').notNull(),
        isVerifed: boolean('isVerifed').default(false),
        createdAt: timestamp('createdAt').defaultNow().notNull(),
    },
    (users) => {
        return {
            uniqueIdx: uniqueIndex('unique_idx').on(users.email),
        };
    },
);
