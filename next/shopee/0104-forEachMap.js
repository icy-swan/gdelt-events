function test() {
    let a = [1,2,3];
    a.forEach((i,d, a)=>{a[d]+=1;console.log(i,d, a, this)})
    // this指向window
    // 允许修改a，但运行时不受影响
    // map唯一区别在于返回新内容
    console.log(a)
}
test();