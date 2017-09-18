-- Query 1
SELECT
  User.firstName, User.lastName
FROM User
INNER JOIN ContainerUserMembership ON ContainerUserMembership.userID = User.userID
INNER JOIN Container ON Container.containerID = ContainerUserMembership.containerID
WHERE Container.containerName = "Athenium"
-- INNER JOIN because you want info only if userID matches, not if one has one and one doesn't.

-- Query 2
SELECT
  containerName
FROM Container
LEFT Join ContainerUserMembership ON ContainerUserMembership.containerID = Container.containerID
WHERE ContainerUserMembership.userID IS NULL