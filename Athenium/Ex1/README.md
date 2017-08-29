# Question 1 - SQL

Assume you have the following tables:
Item
+-------------+--------------+------+-----+----------------+
| Field       | Type         | Null | Key | Extra          |
+-------------+--------------+------+-----+----------------+
| itemID      | int(11)      |      | PRI | auto_increment |
| name        | varchar(64)  |      |     |                |
| description | varchar(128) | YES  |     |                |
| categoryID  | int(11)      | YES  |     |                |
+-------------+--------------+------+-----+----------------+

Category
+-------------+--------------+------+-----+----------------+
| Field       | Type         | Null | Key | Extra          |
+-------------+--------------+------+-----+----------------+
| categoryID  | int(11)      |      | PRI | auto_increment |
| name        | varchar(64)  |      |     |                |
+-------------+--------------+------+-----+----------------+

ItemOrderMembership
+-------------+--------------+------+-----+----------------+
| Field       | Type         | Null | Key | Extra          |
+-------------+--------------+------+-----+----------------+
| orderID     | int(11)      |      |     |                |
| itemID      | int(11)      |      |     |                |
+-------------+--------------+------+-----+----------------+

Write a query that will get me the item name and item category name for
all items in orderID 12345. Please note that Item.categoryID may be NULL,
and that the query should return item names even for those records where
this is the case.