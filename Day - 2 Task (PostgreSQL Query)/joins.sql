1) PostgreSQL INNER JOIN

SELECT * FROM orders as o
INNER JOIN customer as c
ON o.customer_id = c.customer_id

2) PostgreSQL LEFT JOIN

select * FROM customer as c
LEFT JOIN orders as o
ON c.customer_id = o.customer_id

