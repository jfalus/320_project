/*ALTER TABLE employees ADD CONSTRAINT unique_email UNIQUE("email");*/
ALTER TABLE "pto_request" ALTER COLUMN "date_created" SET DEFAULT CURRENT_DATE;
ALTER TABLE "performance_review" ALTER COLUMN "date_created" SET DEFAULT CURRENT_DATE;
ALTER TABLE "assigned_training" ALTER COLUMN "date_created" SET DEFAULT CURRENT_DATE; 

ALTER TABLE "pto_request" DROP COLUMN "progress";

ALTER TABLE "pto_request" ADD COLUMN "completion" boolean, ADD COLUMN "approve_deny" boolean,
ADD COLUMN "sent_from" bigint;

ALTER TABLE "performance_review" ADD COLUMN "sent_from" bigint;

CREATE TABLE general_task(
	"employeeId"	bigserial,
	"companyId"		bigserial,
	"task_id"		bigserial PRIMARY KEY,
	"title"			text,
	"description"	text,
	"date_created"	date DEFAULT CURRENT_DATE,
	"date_due"		date,
	"progress"		text,
	
	FOREIGN KEY("employeeId", "companyId") REFERENCES employees("employeeId", "companyId")
);