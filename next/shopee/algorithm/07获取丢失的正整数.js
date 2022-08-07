const nums = [3, 4, -1, 1, 4, 1];
const getMiss = (nums) => {
    for(let n of nums) {
        if(typeof nums[+n - 1] !== 'undefined') {//将整数对应位置设置为字符串
            nums[+n -1 ] = '' + nums[+n -1 ];
        }
    }
    for(let i = 0; i < nums.length; i++) {
        if(typeof nums[i] === 'number') {//遍历，如果找到非字符串 - 就是该整数没出现
            return i + 1;
        }
    }
    return nums.length + 1;
}
console.log(getMiss(nums));
const findDuplicate = (nums) => {
    let newArr = Array.from(nums);
    for(let n of newArr) {
        const cur = newArr[+n - 1];
        const curType = typeof cur
        if(curType === 'string') {
            return newArr[n];
        } else {
            cur = '' + cur;
        }
    }
    return -1;
}
console.log(findDuplicate(nums))