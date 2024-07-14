PostgreSQL WHERE

1) Using WHERE clause with the equal (=) operator example

SELECT
	last_name,
	first_name
FROM
	customer
WHERE
	first_name = 'Hiren';
	
2) Using WHERE clause with the AND operator example

SELECT
	customer_id,
	first_name,
	last_name
FROM
	customer
WHERE
	first_name = 'Hiren' AND last_name = 'Parejiya';
	
3) Using WHERE clause with the IN operator example

SELECT
	customer_id,
	first_name,
	last_name
FROM
	customer
WHERE first_name IN ('John','David','James');


4) PostgreSQL LIKE
-- LIKE operator matches value case-sensitively.

SELECT
	first_name,
    last_name
FROM
	customer
WHERE
	first_name LIKE '%EN%';
	
	
5) PostgreSQL ILIKE
-- ILIKE operator matches value case-insensitively.

SELECT
	first_name,
    last_name
FROM
	customer
WHERE
	first_name LIKE '%EN%';

