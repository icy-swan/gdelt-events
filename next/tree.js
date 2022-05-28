// 树的遍历
class Tree {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    sayName() {
        console.log(this.value);
    }
}

const root = new Tree(1);
root.left = new Tree(1.1);
root.right = new Tree(1.2);
root.left.left = new Tree('1.1.1');
root.left.right = new Tree('1.1.2');
root.right.left = new Tree('1.2.1');
root.right.right = new Tree('1.2.2');
root.left.right.left = new Tree('1.1.2.1');

function searchTreeDeep(tree) {
    if(tree) {
        tree.sayName();
        searchTreeDeep(tree.left);
        searchTreeDeep(tree.right);
    }
}
searchTreeDeep(root);
console.log('---')

function searchTreeBreath(tree) {
    if(tree) {
        tree.sayName();
        const searchStack = [tree];
        while(searchStack.length !== 0) {
            const target = searchStack[0];
            if(target.left) {
                searchStack.push(target.left);
                target.left.sayName();
            }
            if(target.right) {
                searchStack.push(target.right);
                target.right.sayName();
            }
            searchStack.shift();
        }
    }
}
searchTreeBreath(root);

// 斐波那契数列 f(n) = f(n-1) + f(n-2), f(0) = 1; f(1) = 2;
// M步台阶，每次走1-2步，多少种走法的问题从M到M-1、M-2，1、2种，到达M层需要f(n-1),f(n-2)之和
// 超过100crash
const climbStair = function(n) {
    if(n === 1) return 1;
    if(n===2) return 2;
    return climbStair(n-1) + climbStair(n-2);
}
const fastClimbStair = (n)=> {
    let a = 1;
    let b = 1;
    for(let i =0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
}
const n = 22;
let startTime = performance.now();
console.log(climbStair(n));
let endTime = performance.now();
console.log(endTime - startTime);
startTime = endTime;
console.log(fastClimbStair(n));
endTime = performance.now();
console.log(endTime - startTime);