const matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
const rotate = (nums)=> {
    const len = matrix.length;
    if(len > 1) {
        for(let i = 0; i < len; i++) {
            const temp = [];
            for(let j = 0; j < len; j++) {
                temp.push(matrix[len-1-j][i]);
            }
            matrix.push(temp);
        }
        matrix.splice(0, len);
    }
    return matrix;
}
console.log(rotate(matrix));
const rotate2 = (nums) => {
    const len = nums.length;
    for(let i = 0; i< len; i++) {
        for(let j = 0; j < len; j++) {
            if(i !== j) {
                nums[i][j] = nums[i][j] ^ nums[j][i];
                nums[j][i] = nums[i][j] ^ nums[j][i];
                nums[i][j] = nums[i][j] ^ nums[j][i];
            }
        }
    }
    for(let i = 0; i < len; i ++) {
        nums[i] = nums[i].reverse();
    }
    return nums;
}
console.log(rotate2(matrix));