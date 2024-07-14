1) PostgreSQL subquery with IN operator

SELECT * from orders
where customer_id IN (select customer_id from customer where active = true)

2) PostgreSQL subquery with EXISTS operator

SELECT
    customer_id,
	first_name,
	last_name,
	email
FROM
	customer
WHERE
	EXISTS (
		SELECT
			1
		FROM
			orders
		WHERE
			orders.customer_id = customer.customer_id
	);

