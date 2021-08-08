CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(255), -- varchar is a simple way of saying just text/string
	"completed" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR(255),
	"completed_date" DATE,
	"date_added" DATE
);
