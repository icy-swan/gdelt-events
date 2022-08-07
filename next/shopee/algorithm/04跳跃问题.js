const arr = [2, 3, 0, 1, 4];
const getMinStep = (arr = []) => {
    let step = 0;
    const len = arr.length;
    let next = 0;
    for(let i = 0; i < len; i+= next) {
        const cur = arr[i];
        const subStr = arr.slice(i+1, i + cur+1);
        const max = Math.max(...subStr);
        next = subStr.lastIndexOf(max) + i + 1;
        step += 1;
    }
    return step;
}
console.log(getMinStep(arr));