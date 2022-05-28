function animal(name) {
    this.name = name;
    this.notGood = []
}
animal.prototype.sing = function(){
    return `${this.name} + sing`
}
// fast extend
function dog(dName) {
  	this.dName = dName;
}
dog.prototype = new animal('dog');
const dei = new dog('dei');
const dfe = new dog('dfe');
dei.notGood.push(dei.dName);
/* console.log(dfe.notGood); */

// override ownproperty
function bird(bName) {
    this.bName = bName;
    animal.call(this, 'bird');
}

// ownProperty & prototype
function snake(sName) {
		this.sName = sName;
    animal.call(this, 'snake');
}
/* snake.prototype = animal.prototype; */
snake.prototype = new animal('snake');

// best extend
function cat(cName) {
    this.cName = cName;
    animal.call(this, 'cat');
}
function temp() {}
temp.prototype = animal.prototype;
cat.prototype = new temp();
cat.prototype.constructor = cat;

const kiwi = new cat('kiwi')
const waga = new cat('waga')

kiwi.notGood.push(kiwi.cName);
/* console.log(waga.notGood); */

cat.prototype.sayHello = function() {return 'cat hello'};
/* console.log(animal.prototype.sayHello) */

function C() {}
function D() {}

let o = new C()

// true, because: Object.getPrototypeOf(o) === C.prototype
o instanceof C

// false, because D.prototype is nowhere in o's prototype chain
o instanceof D

o instanceof Object           // true, because:
C.prototype instanceof Object // true

C.prototype = {}
let o2 = new C()

o2 instanceof C  // true

// false, because C.prototype is nowhere in
// o's prototype chain anymore
o instanceof C

D.prototype = new C()  // add C to [[Prototype]] linkage of D
let o3 = new D()
o3 instanceof D        // true
o3 instanceof C        // true since C.prototype is now in o3's prototype chain

// 简单去重
const arr = new Array();
let count = 100;
while (count > 0) {
    arr.push(Math.floor(Math.random() * 100));
    count -= 1;
}
arr.push(NaN, NaN, undefined, undefined, {a:1});
/* console.log(arr.length) */
const uniArr = new Set(arr);
/* console.log(Array.from(uniArr).length); */
// 简写
const uniArr1 = [...new Set(arr)];
/* console.log(uniArr1.length); */

// nan, object, function都能解决
const tempMap = new Map();
arr.forEach(item=> {
    tempMap.set(item, undefined);
})
const uniArr2 = tempMap.keys();
/* console.log(Array.from(uniArr2).length); */

const uniArr3 = arr.reduce((last, current) => {
	return last.includes(current) ? last : last.concat(current);
}, [])
/* console.log(uniArr3.length); */

// 简单的发布订阅
class Notifier {
    constructor() {
        this.events = new Map();
    }
    subscribe(eventName, callback) {
        const callbackList = this.events.get(eventName);
        this.events.set(eventName, typeof callbackList !== 'undefined' ? callbackList.concat(callback) : [callback]);
    }
    publish(eventName, ...args) {
        const callbackList = this.events.get(eventName);
        if(Array.isArray(callbackList) && callbackList.length > 0) {
            this.events.get(eventName).forEach(cb => cb(...args));
        }
    }
    unsubscribe(eventName, callback) {
        const callbackList = this.events.get(eventName);
        if(Array.isArray(callbackList) && callbackList.length > 0) {
            this.events.set(eventName, callbackList.filter(cb => cb !== callback));
        }
    }
    
}
const nf = new Notifier();
/* function showLoad(data) {
    console.log('load', data);
} */
nf.subscribe('load', showLoad);
nf.subscribe('load', showLoad);
nf.publish('load', 'a information');
nf.unsubscribe('load', showLoad);
nf.publish('load', 'a information');

// memory leak
const o1 = {
    a: 1,
    get a() {
        return this.a;
    },
    set a(x) {
        this.a = x;
    }
}
// o1.a
// async
// 宏任务微任务
// asyc 和 promise一样
async function async1() {
    console.log('async1 start'); // second
    await async2(); // third
    console.log('async1 end'); // 6th
}
async function async2() {
    console.log('async2') // third
}
console.log('script start'); // first
setTimeout(()=> {
    console.log('timeout'); // 8th or 10th
}, 0)
/* setimmediate(()=> {
    console.log('imm'); //9th
}) */
async1(); // second
/* process.nextTicker(()=> {
    console.log('next ticker'); //8th
}) */
new Promise((resolve, reject)=> {
    console.log('promise1'); // 4th
    resolve();
    throw new Error('e0');// no response
}).then(()=> {
    console.log('promise2'); // 7th
}).catch(e=> {
    console.log(e);
})
console.log('script end'); // 5th

// max
Math.max() === -Infinity;
Math.min() === Infinity;

// defer js并行加载domcontentload后依次触发
// async js并行加载，js不会按编写顺序加载

// promise
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
}, resaon => {console.log(resaon)});
// allSettled  -- all resolve or reject
// any -- any resolve
// race -- first resolve or reject
for(let i =0; i < 10; i++) {
    setTimeout((i)=> {
        console.log(i)
    }, 1000)
}
for (let i=0; i<5; i++) {
    setTimeout(() => console.log(i), 1000*i)
}
const sleep = ()=>new Promise(res => setTimeout(res, 1000));
(async function it() {
    for(let i =0; i < 5; i++) {
        await sleep();
        console.log(i);
    }
})();

// about this

// call bind apply
function Person(name, age) {
    this.name = name;
    this.age = age;
}
function Male(name, age) {
    this.type = 'male';
    Person.call(this, name, age);
}
function temp() {};
temp.prototype = Person.prototype;
Male.prototype = new temp();
Male.prototype.constructor = Male;
// bind
const arrT1 = [1, 3, 5];
const max = Math.max.apply(Math, arrT1);// max不接受数组 当然可以用...arrT1
console.log(max);
// apply
function a() {
    this.age = 3;
    this.log = function() {
        setTimeout(function() {
            console.log(this);
            console.log(this.age);
        }.bind(this), 0);
    }
}
// 等价于箭头函数，箭头函数的作用域是定义时确定，绑定到父级的块
function a() {
    this.age = 3;
    this.log = function() {
        setTimeout(() => {
            console.log(this);
            console.log(this.age);
        }, 0);
    }
}

new a().log()// a{age:3, log: f}, 3

// 箭头函数不创建自身的this、没原型即没costructor，argument等，无法作为构造函数

// new 的过程先创建一个对象挂载原型(即this)，将this指向对象，执行构造函数赋予对象，返回对象
/* function TestObj(num) {
  this.num = num
}
function newFun(cont, ...args) {
    //cont是构造函数，args是构造函数的所需参数
    // 新建一个对象，new出来返回的就是这个
    let obj = Object.create(cont.prototype); 
    // 给这个对象指定原型链，构造函数有什么，obj也会有
    
    let result = cont.apply(obj, args)
    //运行构造函数，把构造函数的参数挂到obj上，注意是obj
    // 
    return result instanceof Object ? result : obj
}
const test1 = newFun(TestObj,1) */

const s1 = Symbol('a');
Symbol.for('a') !== Symbol('b')