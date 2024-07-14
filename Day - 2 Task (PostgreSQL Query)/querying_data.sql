PostgreSQL SELECT examples

1) Using PostgreSQL SELECT statement to query data from one column example

SELECT first_name FROM customer;

2) Using PostgreSQL SELECT statement to query data from multiple columns example

SELECT
   first_name,
   last_name,
   email
FROM
   customer;

3) Using PostgreSQL SELECT statement to query data from all columns of a table example

SELECT * FROM customer;


PostgreSQL ORDER BY examples

1) Using PostgreSQL ORDER BY clause to sort rows by one column

SELECT
	first_name,
	last_name
FROM
	customer
ORDER BY
	first_name ASC;

2) Using PostgreSQL ORDER BY clause to sort rows by one column in descending order

SELECT
       first_name,
       last_name
FROM
       customer
ORDER BY
       last_name DESC;

3) Using PostgreSQL ORDER BY clause to sort rows by multiple columns

SELECT
	customer_id,
	first_name,
	last_name
FROM
	customer
ORDER BY
	first_name ASC,
	last_name DESC;

