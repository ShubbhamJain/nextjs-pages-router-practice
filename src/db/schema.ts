import {
  int,
  mysqlTable,
  varchar,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  userName: varchar("userName", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  loggedIn: boolean("loggedIn").default(false),
});

export const comments = mysqlTable("userComments", {
  id: int("id").primaryKey().autoincrement(),
  content: text("content").notNull(),
  likes: int("likes").default(0),
  userId: int("userId")
    .references(() => users.id)
    .notNull(),
});
