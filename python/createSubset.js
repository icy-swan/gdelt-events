// const varStr = "l.TotalInvest l.MaintainInvest l.AddInvestExpend l.age l.AssetSize l.InefficInvestDegree l.InefficInvestSign l.top5 l.top1   l.LargestHolderRate l.SOE l.ProfitParent l.NetProfit l.OperatingEvenue l.OperatingCost l.OperationProfit l.size_w l.TobinQ_w l.IntangibleAsset_w l.GrowthOpportunity_w l.FinLeverageRatio_w l.CashFlowStatus_w l.KZ_w l.lnsubsidy l.lnsubsidy_w   l.Intangible_w  l.subsidyratio_w l.InefficInvestDegree_w   l.ROA_w l.liability_w l.资产负债率 l.市账比 l.净营运资本 l.息税前利润 l.现金股利 l.现金股利支付率 l.FC指数 l.企业经营年度 l.SA指数 l.经营性净现金流 l.是否支付现金股利 l.长期负债 l.销售收入增长率 l.WW指数 l.货币资金 l.现金及存放中央银行款项 l.交易性金融资产 l.流动资产合计 l.可供出售金融资产净额 l.固定资产净额 l.无形资产净额 l.非流动资产合计 l.交易性金融负债 l.应付职工薪酬 l.应付利息 l.流动负债合计 l.非流动负债合计 l.负债合计";
const varStr = "l.top5 l.LargestHolderRate l.OperationProfit l.size_w l.TobinQ_w l.GrowthOpportunity_w l.FinLeverageRatio_w l.CashFlowStatus_w l.KZ_w  l.Intangible_w  l.InefficInvestDegree_w   l.ROA_w l.liability_w";
const varList = varStr.split(' ').filter(v=>(v!="" && v!=" "));
console.log(varList.length);
function allSubsets(arr){
    let res = [[]];
    for(let i = 0; i < arr.length; i++){
        const tempRes = res.map(subset => {
            const one = subset.concat([]);
            one.push(arr[i]);
            return one;
        })
        res = res.concat(tempRes);
    }
    return res;
}
const varAllSubsets = allSubsets(varList);
console.log(varAllSubsets)

// 