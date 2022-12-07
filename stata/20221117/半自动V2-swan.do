use  "/Users/ianli/Downloads/E13B 合入diversity.dta",clear
* 构建回归所需的主要观测值
xtset firm year

* 初始的控制变量，从中找出收敛的组合
global controlVariables l.tangible   l.TobinQ  l.cost  l.profit l.BookToMarketRatio   l.StockYield l.InefficInvestDegre  l.top1


* 带检测的目标控制变量,把最后一个CashFlowStatus变成想测试的M
local controlVariable 主营业务收入增长率


/*
 * 后面的内容不用改
 * 输出的结果列
 * controlVariableResultSet_1 ： 第一列回归后收敛的内容
 * controlVariableResultSet_2 ： 第二轮回归后收敛的内容
 * coefficient_AM             ： AM第一轮回归后的coefficient，与controlVariableResultSet_1列结果对应
 * p_A_1                      ： A的第一轮回归后的P
 * p_A_2                      ： A的第二轮回归后的P
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

gen M = `controlVariable'
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
	reghdfe RD l.A l.M AM  l.ROA l.liability l.size `cv', absorb( industry province firm year) vce(clu firm) 
	// 要求A的coefficient>0，A的p值<0.1，AM的p值<0.1
	if(_b[l.A] > 0 & (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) < 0.1 & (2 * ttail(e(df_r), abs(_b[AM] / _se[AM]))) < 0.1){
		// 将第一轮成功的结果写入 controlVariableResultSet_1
		replace controlVariableResultSet_1 = "`cv' " in `index'
		// 记录A的p值
		replace p_A_1 = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) in `index'
		// 记录AM的coefficient_AM值
		replace coefficient_AM = _b[AM] in `index'
		// 更新index
		local index=`index'+1
		dis ">>>In reghdfe 1，success of index: `index' - total: `maxNum'"
	}
	else {
		local temp_coefficient_AM = _b[l.A]
		local temp_p_A_1 = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A])))
		local temp_p_AM = (2 * ttail(e(df_r), abs(_b[AM] / _se[AM])))
		dis ">>>In reghdfe 1，fail of index: `index'- coefficient_AM: `temp_coefficient_AM' - p_A_1: `temp_p_A_1' - p_AM: `temp_p_AM'"
	}
}
// 算完删除M和AM，删除统计值
drop M AM group max_varname

/*
 * 如果不想进行第二轮回归，后面代码直接删除就是了
*/

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
	reghdfe `controlVariable' l.A l.ROA l.liability l.size `cv', absorb( industry province firm year) vce(clu firm)
	// 要求A的coefficient>0，A的p值<0.1
	if(_b[l.A] > 0 & (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) < 0.1){
		// 将第二轮成功的结果写入 controlVariableResultSet_2
		replace controlVariableResultSet_2 = "`cv' " in `index'
		// 记录A的p值
		replace p_A_2 = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) in `index'
		// 更新index
		local index=`index'+1
		dis ">>>In reghdfe 2，success of index: `index' - total: `maxNum'"
	}
	else {
		local temp_p_A_2 = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A])))
		dis ">>>In reghdfe 2，fail of index: `index' - p_A_2: `temp_p_A_2'"
	}
}
// 算完删除统计值
drop group max_varname
