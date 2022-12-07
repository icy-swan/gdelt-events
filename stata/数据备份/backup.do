*11月3日
*==========================================================================
* *第一次打开需要跑一下
**xtset firm year
* gen A= risk36
*Z可选 ：
*l.TotalInvest l.MaintainInvest l.AddInvestExpend   age l.AssetSize l.InefficInvestDegree l.InefficInvestSign l.top5 l.top1   l.LargestHolderRate   SOE     l.ProfitParent l.NetProfit l.OperatingEvenue l.OperatingCost l.OperationProfit l.size_w l.TobinQ_w l.IntangibleAsset_w l.GrowthOpportunity_w l.FinLeverageRatio_w l.CashFlowStatus_w l.KZ_w l.lnsubsidy l.l.lnsubsidy_w   l.Intangible_w  l.subsidyratio_w l.InefficInvestDegree_w   l.ROA_w l.liability_w   资产负债率 市账比 净营运资本 息税前利润 现金股利 现金股利支付率 FC指数 企业经营年度 SA指数 经营性净现金流 是否支付现金股利 长期负债 销售收入增长率 WW指数 货币资金 现金及存放中央银行款项 交易性金融资产 流动资产合计 可供出售金融资产净额 固定资产净额 无形资产净额 非流动资产合计 交易性金融负债 应付职工薪酬 应付利息 流动负债合计 非流动负债合计 负债合计 
*==========================================================================


global Z " l.ROA_w  l.size_w l.TobinQ_w l.Intangible_w l.FinLeverageRatio_w l.liability_w l.CashFlowStatus_w l.InefficInvestDegree_w  l.LargestHolderRate "


 * 以下M
 * 1. （lnHHIA lnHHID lnHHIB lnHHIC  HHIA HHIB HHIC HHID 行业销售收入增长率 行业内公司总数 ）中的2个通过
 * 2. （FC指数 KZ_w SA指数 WW指数 ）中的2个通过
 * 3. （ SOE subsidyratio_w lnsubsidy_w ）中的2个通过
 * 4. 是否对外投资 通过
 * 5. lnEPU36 通过
gen M=lnHHIA
gen AM=l.A * l.M

*以下命令， l.A的p值要小于10%，且l.A的系数为正
reghdfe RD_w l.A $Z, absorb( industry2 province firm year) vce(clu firm)

*以下命令， l.A的p值要小于10%，且l.A的系数为正，且AM的p值要小于10%，
reghdfe RD_w l.A  l.M  AM $Z, absorb( industry2 province firm year) vce(clu firm) 

drop AM M 


*以下M（流动资产合计 经营性净现金流 净营运资本  交易性金融资产 可供出售金融资产净额 经营性净现金流 货币资金 NetProfit OperatingNetCashFlow OperationProfit subsidy）适用

// gen N= X/TotalAssets
// winsor2 N, cuts(1 99)
// gen M  = N_w
// gen AM = l.A * l.M
//
// *以下命令， l.A的p值要小于10%，且l.A的系数为正
// reghdfe RD_w l.A $Z, absorb( industry2 province firm year) vce(clu firm)
//
// *以下命令， l.A的p值要小于10%，且l.A的系数为正，且AM的p值要小于10%，
// reghdfe RD_w l.A  l.M  AM $Z, absorb( industry2 province firm year) vce(clu firm) 
//
//
// drop AM M N_w N








 