// 乱序
const shuffer = (tarArr)=> {
    const arr = Array.from(tarArr);
    const len = arr.length;
    for(let i = len; i > 0; i--) {
        const j = ~~(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]]
    }
    return arr;
}
// n(n-1)/2次替换机会，v8的插入排序(<10)和快排时间复杂度不够o(n),o(n^2)
console.log(shuffer(randomArr), randomArr);