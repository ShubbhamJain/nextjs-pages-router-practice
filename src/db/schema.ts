import { int, mysqlTable, varchar, text } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("email", { length: 256 }).notNull(),
  profilePic: text("profilePic"),
});

export const comments = mysqlTable("userComments", {
  id: int("id").primaryKey().autoincrement(),
  content: text("content").notNull(),
  likes: int("likes").default(0),
  // userId: int('userId').references(() => users.id).notNull(),
});
