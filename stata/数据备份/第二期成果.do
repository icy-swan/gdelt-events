use "/Users/ianli/Desktop/stata工作/after1.dta", clear

// 读取有效结果到暂元
levelsof controlVariableSet, local(chklist_id)
// 二次运行结果的存储
// drop controlVariableSet_2
gen controlVariableSet_2 = ""
gen coefficient_A = .
gen p_A = .
// 重置标志位
local index=1
foreach i in `chklist_id' {
	// 进行二次计算和判断
	reghdfe RD_w l.A `i', absorb( industry2 province firm year) vce(clu firm)
	// 计算p值得最佳方法
	if(_b[l.A] > 0 & (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]))) < 0.1){
		dis "start-in success of index is " + `index'
		replace controlVariableSet_2 = "`i' " in `index'
		replace coefficient_A=_b[l.A] in `index'
		replace p_A = (2 * ttail(e(df_r), abs(_b[l.A] / _se[l.A]) ) ) in `index'
		local index=`index'+1
		dis "end-in success of index is " + `index'
	}   
}
