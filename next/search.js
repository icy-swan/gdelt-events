// 二分查找
// 比如：总共有n个元素，每次查找的区间大小就是n，n/2，n/4，…，n/2^k（接下来操作元素的剩余个数），其中k就是循环的次数。由于n/2^k取整后>=1，即令n/2^k=1，
// 可得k=log2n,（是以2为底，n的对数），所以时间复杂度可以表示O()=O(logn)
const randomArr = [];
for(let i = 0; i < n; i++) {
    randomArr.push(~~(Math.random() * 12));
}
// 直接sort 10在9之前
randomArr.sort((a, b) => {
    return a - b
});
const target = randomArr[5];
function bSearch(arr, tar) {
    if(!arr || !Array.isArray(arr) || arr.length < 1) {
        return -1;
    }
    let low = 0;
    let high = arr.length - 1;
    while(low < high) {
        const middle = ~~((high + low) /2);
        const tmp = arr[middle];
        if(tmp === tar) {
            low = high;
            return middle;
        } else if(tmp > tar) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }
    return -1;
}
console.log(bSearch(randomArr, target));