use "/Users/ianli/Desktop/stata工作/小葫芦测试用.dta", clear
drop M AM controlVariableSet
xtset firm year

// 定义控制变量
global controlVariables l.ROA_w  l.size_w l.TobinQ_w l.Intangible_w l.FinLeverageRatio_w l.liability_w l.CashFlowStatus_w l.InefficInvestDegree_w  l.LargestHolderRate
// 定义一个控制变量的结果值的set
gen controlVariableSet = ""
// 构建一个控制变量法的元组
tuples $controlVariables

// 构建回归所需的主要观测值
gen M=lnHHIA
gen AM=l.A * l.M
// 存储AM的coefefficient以供后续二次处理
gen coefficient_AM=.

local index 1


forvalues i = 1/`ntuples' {
	reghdfe RD_w l.A l.M AM `tuple`i'', absorb( industry2 province firm year) vce(clu firm)
	if(_b[l.A] > 0 & abs(_b[l.A]/_se[l.A]) > 1.96 & abs(_b[AM]/_se[AM]) > 1.96){
		dis "start-in success of index is " + `index'
		replace controlVariableSet = "`tuple`i''" in `index'
		replace coefficient_AM = _b[AM] in `index' 
		local index=`index'+1
		dis "end-in success of index is " + `index'
	}
}

// 结果
list controlVariableSet if controlVariableSet != ""
