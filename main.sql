SELECT a.*, CASE WHEN EXISTS (SELECT 1 FROM Menus WHERE PMenuId = a.MenuId) THEN 1 ELSE 0 END AS haschild 
FROM Adhvik_Core_API.dbo.Menus AS a WHERE ISNULL(a.PMenuId, 0) = 0
SELECT a.*, CASE WHEN EXISTS (SELECT 1 FROM Menus WHERE PMenuId = a.MenuId) THEN 1 ELSE 0 END AS haschild 
FROM Adhvik_Core_API.dbo.Menus AS a WHERE a.PMenuId = 22
SELECT * FROM Adhvik_Core_API.dbo.MenusForClient WHERE ClientId='MaharashtraNews1'
SELECT * FROM AccountUserAccess


DECLARE @RoleIds AS varchar(500) SELECT @RoleIds=RoleIds FROM Adhvik_swayamg.dbo.AccountTypesRoles WHERE AccountId=10000000;
WITH CTE AS (select m.*, f.FormDir, aa.CanAccess, aa.ConditionalAccess0, aa.ConditionalAccess1 from Adhvik_Core_API.dbo.Menus AS m 
LEFT OUTER JOIN Adhvik_Core_API.dbo.Forms AS f ON m.FormCode=f.FormCode 
LEFT OUTER JOIN (SELECT *, ROW_NUMBER() OVER (PARTITION BY MenuId ORDER BY AccountId DESC) AS RowNum FROM AccountUserAccess WHERE CanAccess <> '' ) AS aa 
	ON aa.MenuId = m.MenuId AND aa.RowNum = 1 UNION select m.MenuId, null, m.FormCode, m.MUrl, m.MName, m.MDescription, m.MIcon, m.MenuI, m.ForClients, m.MDeleteYN, m.PFormCode, m.FCondition, m.BtnHead, m.BtnFoot, m.FView, m.CloseOnSubmit, m.ModalStyle, m.ModalClass, m.MOrder, m.InsideForm , f.FormDir, 'FAEXVPD', NULL, NULL from Adhvik_Core_API.dbo.Menus AS m LEFT OUTER JOIN Adhvik_Core_API.dbo.Forms AS f ON m.FormCode=f.FormCode WHERE m.MenuId IN (SELECT MenuId FROM Adhvik_Core_API.dbo.ATasks WHERE AllocatedTo=10000000 AND TStatus IN (2,3)) ) SELECT *, (SELECT *, (SELECT *, (SELECT *, (SELECT *, (SELECT *, (SELECT * FROM CTE AS m6 WHERE m6.PMenuId=m5.MenuId FOR JSON PATH, INCLUDE_NULL_VALUES) AS Level6 FROM CTE AS m5 WHERE m5.PMenuId=m4.MenuId FOR JSON PATH, INCLUDE_NULL_VALUES) AS Level5 FROM CTE AS m4 WHERE m4.PMenuId=m3.MenuId FOR JSON PATH, INCLUDE_NULL_VALUES) AS Level4 FROM CTE AS m3 WHERE m3.PMenuId=m2.MenuId FOR JSON PATH, INCLUDE_NULL_VALUES) AS Level3 FROM CTE AS m2 WHERE m2.PMenuId=m1.MenuId FOR JSON PATH, INCLUDE_NULL_VALUES) AS Level2 FROM CTE AS m1 WHERE m1.PMenuId=m0.MenuId FOR JSON PATH, INCLUDE_NULL_VALUES) AS Level1 FROM CTE AS m0 WHERE m0.PMenuId IS NULL OR m0.PMenuId = 0
-- FOR JSON PATH, INCLUDE_NULL_VALUES;

136_111
, CAST(a.TotalViews AS bigint) desc

