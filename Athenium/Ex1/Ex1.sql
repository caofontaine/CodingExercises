SELECT Item.name, Category.name
FROM Item
  -- Regardless if Item.categoryID is null, values will be obtained for this.
  LEFT JOIN Category ON Item.categoryID = Category.categoryID
  -- This will include all matching itemID's from both tables.
  INNER JOIN ItemOrderMembership ON Item.itemID = ItemOrderMembership.itemID
WHERE ItemOrderMembership.orderID = 12345 # Only include order # 12345