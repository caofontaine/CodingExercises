# Question 1 - SQL

Assume you have the following tables:

Item
+-------------+--------------+------+-----+----------------+
|&nbsp;Field&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;Null&nbsp;|&nbsp;Key&nbsp;|&nbsp;Extra&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
+-------------+--------------+------+-----+----------------+
|&nbsp;itemID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;int(11)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;PRI&nbsp;|&nbsp;auto_increment&nbsp;|
|&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;varchar(64)&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|&nbsp;description&nbsp;|&nbsp;varchar(128)&nbsp;|&nbsp;YES&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
|&nbsp;categoryID&nbsp;&nbsp;|&nbsp;int(11)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;YES&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
+-------------+--------------+------+-----+----------------+

Category
+-------------+--------------+------+-----+----------------+
|&nbsp;Field&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;Null&nbsp;|&nbsp;Key&nbsp;|&nbsp;Extra&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
+-------------+--------------+------+-----+----------------+
| categoryID  | int(11)      |      | PRI | auto_increment |
| name        | varchar(64)  |      |     |                |
+-------------+--------------+------+-----+----------------+

ItemOrderMembership
+-------------+--------------+------+-----+----------------+
|&nbsp;Field&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;Null&nbsp;|&nbsp;Key&nbsp;|&nbsp;Extra&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
+-------------+--------------+------+-----+----------------+
| orderID     | int(11)      |      |     |                |
| itemID      | int(11)      |      |     |                |
+-------------+--------------+------+-----+----------------+

Write a query that will get me the item name and item category name for
all items in orderID 12345. Please note that Item.categoryID may be NULL,
and that the query should return item names even for those records where
this is the case.