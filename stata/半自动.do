use "/Users/ianli/Desktop/stata工作/defaultDATA.dta", clear
* 构建回归所需的主要观测值
xtset firm year

* 初始的控制变量，从中找出收敛的组合
global controlVariables l.top5 l.LargestHolderRate l.OperationProfit l.size_w l.TobinQ_w l.GrowthOpportunity_w l.FinLeverageRatio_w l.CashFlowStatus_w l.KZ_w  l.Intangible_w  l.InefficInvestDegree_w   l.ROA_w l.liability_w

tuples $controlVariables
/*
  01预处理
*/
gen controlVariableSet = ""
* 将控制变量的default真子集添加到列 controlVariableSet
forvalues i = 1/`ntuples' {
	replace controlVariableSet = "`tuple`i''" in `i'
}

// 通过创建mean和max获取最大值
egen group = group(controlVariableSet)
su group, meanonly
egen max_varname = max(group)
levelsof max_varname, local(maxNumList)
foreach idx in `maxNumList' {
	local maxNum = `idx'
}

* 第一、二轮变量筛选后的成功的set
gen controlVariableResultSet_1 = ""
gen controlVariableResultSet_2 = ""
* 存储
* AM的coefefficient
* 第一轮A的p
* 第二轮A的p
gen coefficient_AM=.
gen p_A_1=.
gen p_A_2=.

* 带尝试的组合
global level1 lnHHIA lnHHID lnHHIB lnHHIC  HHIA HHIB HHIC HHID 行业销售收入增长率 行业内公司总数
global level2 FC指数 KZ_w SA指数 WW指数
global level3 SOE subsidyratio_w lnsubsidy_w
global level4 是否对外投资
global level5 lnEPU36
* 构建每种检验leve成功的次数
local level1PassCount = 0 // 要求>2
local level2PassCount = 0 // 要求>2
local level3PassCount = 0 // 要求>2
local level4PassCount = 0 // 要求=1
local level5PassCount = 0 // 要求=1

foreach target in $level5 {
	if(`level5PassCount' < 1) {
	    gen M = `target'
		gen AM=l.A * l.M
		* 定义插入位置-index
        local index 1
		* 进行第一轮的回归计算
		// 通过判断group的值，裁剪出每一个 controlVariableSet
		// 将每个 controlVariableSet 丢入回归函数进行回归
		forvalues i = 1/`maxNum' {
			preserve
				keep if group == `i'
				levelsof controlVariableSet, local(chklist_id)
				foreach idx in `chklist_id' {
					local cv = "`idx' "
				}
			restore
			// 这样就可以依次取出值了
			dis ">>>Index `i' controlVariableSet is `cv'"
			
			// 第一次回归
			reghdfe RD_w l.A l.M AM `cv', absorb( industry2 province firm year) vce(clu firm) 
			// 要求A的coefficient>0，A的p值<0.1，AM的p值<0.1
			if(_b[l.A] > 0 & (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) < 0.1 & (2 * ttail(e(df_r), abs(_b[AM] / _se[AM]))) < 0.1){
				// 将第一轮成功的结果写入 controlVariableResultSet_1
				replace controlVariableResultSet_1 = "`cv' " in `index'
				// 记录A的p值
				replace p_A_1 = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]) ) ) in `index'
				// 记录AM的coefficient_AM值
				replace coefficient_AM = _b[AM] in `index'
				// 更新index
				local index=`index'+1
				dis ">>>In reghdfe 1，success of index: `index' - total: `maxNum'"
			}
			else {
				dis ">>>In reghdfe 1，fail of index: `index' - p_A_1: " + (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]) ) ) + " - p_AM: " + (2 * ttail(e(df_r), abs(_b[AM] / _se[AM])))
			}
		}
		// 算完删除M和AM，删除统计值
		drop M AM group max_varname
		* 进行第二轮的回归计算
		* 获取第一轮计算的变量列表的值
		// 通过创建mean和max获取最大值
		egen group = group(controlVariableResultSet_1)
		su group, meanonly
		egen max_varname = max(group)
		levelsof max_varname, local(maxNumList)
		foreach idx in `maxNumList' {
			local maxNum = `idx'
		}
		// 重置标志位
		local index=1
		forvalues i = 1/`maxNum' {
			preserve
				keep if group == `i'
				levelsof controlVariableResultSet_1, local(chklist_id)
				foreach idx in `chklist_id' {
					local cv = "`idx' "
				}
			restore
			// 这样就可以依次取出第一次回归后的可行的值了
			dis ">>>Index `i' controlVariableResultSet_1 is `cv'"
			
			// 进行二次回归
			reghdfe RD_w l.A `cv', absorb( industry2 province firm year) vce(clu firm)
			// 要求A的coefficient>0，A的p值<0.1
			if(_b[l.A] > 0 & (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) < 0.1){
				// 将第二轮成功的结果写入 controlVariableResultSet_2
				replace controlVariableResultSet_2 = "`cv' " in `index'
				// 记录A的p值
				replace p_A_2 = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]) ) ) in `index'
				// 更新index
				local index=`index'+1
				dis ">>>In reghdfe 2，success of index: `index' - total: `maxNum'"
			}
			else {
				dis ">>>In reghdfe 2，fail of index: `index' - p_A_2: " + (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]) ) )
			}
		}
		// 算完删除统计值
		drop group max_varname
// 		list controlVariableResultSet_2 if controlVariableResultSet_2 != ""
	}
}
