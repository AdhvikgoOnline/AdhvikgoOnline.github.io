SELECT a.*, CASE WHEN EXISTS (SELECT 1 FROM Menus WHERE PMenuId = a.MenuId) THEN 1 ELSE 0 END AS haschild 
FROM Adhvik_Core_API.dbo.Menus AS a WHERE ISNULL(a.PMenuId, 0) = 0
SELECT a.*, CASE WHEN EXISTS (SELECT 1 FROM Menus WHERE PMenuId = a.MenuId) THEN 1 ELSE 0 END AS haschild 
FROM Adhvik_Core_API.dbo.Menus AS a WHERE a.PMenuId = 22
SELECT * FROM Adhvik_Core_API.dbo.MenusForClient WHERE ClientId='MaharashtraNews1'
SELECT * FROM AccountUserAccess