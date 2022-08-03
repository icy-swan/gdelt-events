function t() {}
let c = new t();
console.log(c instanceof t);
// instance本质
// 先获取右侧的prototype的值
// 再获取左侧的__proto__
// 只需要left的原型链的原型，是right的原型就行
function instance(left, right) {
    const rightPrototype = right.prototype;
    let leftPrototypeChain = left.__proto__;
    while(true) {
        if(!leftPrototypeChain) {
            return false;
        }
        if(leftPrototypeChain === rightPrototype) {
            return true;
        }
        leftPrototypeChain = leftPrototype.__proto__;
    }
}
console.log(instance(c, t))

function Foo(){}
// prototyoe获取自身的原型，自身实例化（new Foo())后，原型会写入实例的原型链
// __proto__查找链上上一个原型
//Foo的.prototype => {constructor: Foo}
//Foo.__proto__(Function.prototype).__proto__(Object.prototype).__proto__(null)
aa = new Foo();
// aa.prototype为实例的返回值，为空的object，没有原型