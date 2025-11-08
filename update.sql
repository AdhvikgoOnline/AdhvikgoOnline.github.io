--19/07/2025 from menerva sand
GO
ALTER TABLE dbo.TrnHAc ADD
	HItemId bigint NULL,
	HNarration nvarchar(4000) NULL,
	HNoQty numeric(12, 3) NULL,
	HNoUnit nvarchar(5) NULL,
	HWtQty numeric(12, 3) NULL,
	HWtUnit nvarchar(5) NULL,
	HRate numeric(12, 2) NULL,
	HRateUnit nvarchar(5) NULL,
	HTranspRate numeric(12, 2) NULL,
	HTranspAmount numeric(12, 2) NULL,
	HTranspIncl tinyint NULL,
	WeighSlipIds varchar(MAX) NULL,
	RejectionNo bigint NULL,
	RejectionDate smalldatetime NULL,
	RejectionReason int NULL,
	RStockPoint int NULL
GO
ALTER TABLE dbo.TrnHAc ADD CONSTRAINT
	DF_TrnHAc_HNoQty DEFAULT ((0)) FOR HNoQty
GO
ALTER TABLE dbo.TrnHAc ADD CONSTRAINT
	DF_TrnHAc_HWtQty DEFAULT ((0)) FOR HWtQty
GO
ALTER TABLE dbo.TrnHAc ADD CONSTRAINT
	DF_TrnHAc_HRate DEFAULT ((0)) FOR HRate
GO
GO
ALTER TABLE dbo.Account ADD CONSTRAINT
	DF_Account_ACreatedDate DEFAULT getdate() FOR ACreatedDate
GO
ALTER TABLE dbo.Account SET (LOCK_ESCALATION = TABLE)
GO
GO
ALTER TABLE dbo.TrnHAc ADD
	RStockPoint int NULL
GO