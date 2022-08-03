// diff let var const
// var 方法作用域。未定义为undefined。定义后方法作用域内都可调
var a = 100;
f();
function f() {
    console.log(a);
    var a = 1;
    console.log(a);
}
console.log(a);