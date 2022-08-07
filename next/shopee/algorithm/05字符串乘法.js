const str1 = '132';
const str2 = '41';
const mult = (str1, str2) => {
    if(str1 === '0' || str2 === '0') {
        return '0';
    }
    const l1 = str1.length;
    const l2 = str2.length;
    const resultArr = new Array(l1 + l2).fill(0);
    for(let i = l1 - 1; i >=0; i--) {
        for(let j = l2 - 1; j >= 0; j--) {
            const temp = str1[i] * str2[j] + resultArr[i + j + 1];
            resultArr[i + j + 1] = temp % 10;
            resultArr[i + j] += Math.floor(temp / 10);
        }
    }
    if(resultArr[0] === 0) {
        resultArr.shift();
    }
    return resultArr.join('');
}
console.log(mult(str1, str2), str1 * str2);