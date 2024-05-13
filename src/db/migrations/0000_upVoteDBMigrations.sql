CREATE TABLE `userComments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`content` text NOT NULL,
	`likes` int DEFAULT 0,
	CONSTRAINT `userComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`profilePic` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
