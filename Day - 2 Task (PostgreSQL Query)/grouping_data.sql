1) PostgreSQL GROUP BY

SELECT
	c.customer_id,
	c.first_name,
	c.last_name,
	c.email,
	COUNT (o.order_id) AS "NoOrders",
	SUM(o.order_amount) AS "Total"
FROM customer as c
INNER JOIN orders as o
	ON c.customer_id = o.customer_id
GROUP BY c.customer_id


2) PostgreSQL HAVING

SELECT
	c.customer_id,
	c.first_name,
	c.last_name,
	c.email,
	COUNT (o.order_id) AS "No_Orders",
	SUM(o.order_amount) AS "Total"
FROM customer as c
INNER JOIN orders as o
	ON c.customer_id = o.customer_id
GROUP BY c.customer_id
HAVING COUNT (o.order_id) > 1

