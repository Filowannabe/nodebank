create database mibanco;
use mibanco;
CREATE TABLE public.accounts (
	id varchar(255) NOT NULL,
	amount int4 NULL,
	customerid varchar(255) NULL,
	openedAt date NULL,
);
CREATE TABLE public.customers (
	id varchar(255) NOT NULL,
	name varchar(255) NULL,
	lastname varchar(255) NULL,
	email varchar(255) NULL
);