 use "/Users/ianli/Desktop/stata工作/E13B  2007-2021 研发投入28961样本.dta", clear
* 构建回归所需的主要观测值
xtset firm year

* 初始的控制变量，从中找出收敛的组合
global controlVariables  l.tangible  l.BookToMarketRatio  l.StockYield l.InefficInvestDegre  l.top1 l.cash3 l.CurrentRatio l.销售收入增长率 

* 待检测的目标控制变量
local controlVariable N


/*
 * 后面的内容不用改
 * 输出的结果列
 * controlVariableResultSet_1 ： 第一列回归后收敛的内容
 * controlVariableResultSet_2 ： 第二轮回归后收敛的内容
 * p_L_M                      ： A的第一轮回归后的M的P
 * p_L_A                      ： A的第二轮回归后的A的P
 * 
*/
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
// 获取最大枚举数
local MAX_EUM = `maxNum'

* 第一、二轮变量筛选后的成功的set
gen controlVariableResultSet_1 = ""
gen controlVariableResultSet_2 = ""
* 存储
* 第一轮l.M的p
* 第二轮l.A的p
gen p_L_M=.
gen p_L_A=.

gen M = `controlVariable'
* 定义插入位置-index
local index 1
local failIndex 1
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
	reghdfe RD7 l.M l.ROA l.size l.liability `cv', absorb( firm year) vce(clu firm) 
	// 要求A的coefficient>0，A的p值<0.1，AM的p值<0.1
	if((2 * ttail(e(df_r), abs(_b[l.M] / _se[l.M]))) < 0.1){
		// 将第一轮成功的结果写入 controlVariableResultSet_1
		replace controlVariableResultSet_1 = "`cv' " in `index'
		// 记录LM的p值
		local temp_p_L_M = (2 * ttail(e(df_r), abs(_b[l.M] / _se[l.M])))
		replace p_L_M = (2 * ttail(e(df_r), abs(_b[l.M] / _se[l.M]))) in `index'
		dis ">>>【success-reghdfe-1】`index' / `maxNum' - p_L_M: `temp_p_L_M' "
		// 更新index
		local index=`index'+1
	}
	else {
		local temp_p_L_M = (2 * ttail(e(df_r), abs(_b[l.M] / _se[l.M])))
		dis ">>>【fail-reghdfe-1】`failIndex' / `maxNum' - p_L_M: `temp_p_L_M' "
        local failIndex = `failIndex'+1
	}
}
// 算完删除M和AM，删除统计值
drop group max_varname

/*
 * 如果不想进行第二轮回归，后面代码直接删除就是了
*/

* 进行第二轮的回归计算
* 获取第一轮计算的变量列表的值
// 通过创建mean和max获取最大值
// 先重置maxNum
local maxNum = `MAX_EUM'+1
egen group = group(controlVariableResultSet_1)
su group, meanonly
egen max_varname = max(group)
levelsof max_varname, local(maxNumList)
foreach idx in `maxNumList' {
	local maxNum = `idx'
	dis `maxNum'
}

if `maxNum' > `MAX_EUM' {
	dis "第一轮回归没有结果，程序结束，获得的第一轮枚举 0 -总枚举为 `MAX_EUM' , controlVariableResultSet_1如下："
	list controlVariableResultSet_1 if controlVariableResultSet_1 != ""
}
else {
	dis "第一轮回归有效结果为`maxNum'-总枚举为 `MAX_EUM' "
    // 重置标志位
	local index=1
	// 重置失败次数
	local failIndex=1
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
		reghdfe l.M  l.A  l.ROA  l.size l.liability `cv', absorb( firm year) vce(clu firm)
		// 要求A的p值<0.1
		if((2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) < 0.1){
			// 将第二轮成功的结果写入 controlVariableResultSet_2
			replace controlVariableResultSet_2 = "`cv' " in `index'
			// 记录A的p值
			replace p_L_A = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) in `index'
			local temp_p_L_A = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A])))
			// 更新index
			local index=`index'+1
			dis ">>>【success-reghdfe-1】`index' / `maxNum' - p_L_A: `temp_p_L_A' "
		}
		else {
			local temp_p_L_A = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A])))
			dis ">>>【fail-reghdfe-1】`failIndex' / `maxNum' - p_L_A: `temp_p_L_A' "
		}
	}
	// 算完删除统计值
	drop group max_varname M
	
}
