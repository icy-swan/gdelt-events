// Input:
// Product1 sales time slot  = [[0709, 0720], [0108, 0120], [1512,1612]],
// Product 2 sales time slot = [[0300, 0312], [0614, 0714]], common_length = 4
// Output: [0709, 0712]

/**
 * ddhh转数值型h
 * @param {*} str 
 * @returns 
 */
const ddhhToH = (str='0000') => {
    return str[0] * 24 * 10 + str[1] * 24 + str[2] * 10 + str[3];
}
/**
 * 数值转二位字符串
 * @param {*} day 
 * @param {*} hour 
 * @returns 
 */
const numberToTwoStr = (day=0, hour=0) => {
    return (day > 9 ? '' + day : '0' + day) + (hour > 9 ? '' + hour : '0' + hour);
}
/**
 * 简单的时间加法
 * @param {*} str 
 * @param {*} duration 
 * @returns 
 */
const addTimeToDDHH = (str, duration) => {
    let hour = Number.parseInt(str[2] + str[3]) + duration;
    let addDay = 0;
    if(hour >= 24) {
        addDay = ~~(hour / 24);
    }
    hour  = hour % 24;
    let day = Number.parseInt(str[0] + str[1]) + addDay;
    return numberToTwoStr(day, hour);
}
const checkDuration = (start=0, end=0, duration=0) => {
    const startHour = ddhhToH(start);
    const endHour = ddhhToH(end);
    if(endHour - startHour >= duration) {
        const endTime = addTimeToDDHH(start, duration - 1);
        return [start, endTime];
    } else {
        return false;
    }
}
const getCommon = (arr1=[], arr2=[], duration) => {
    const [s1, e1] = arr1;
    const [s2, e2] = arr2;
    // s1 < s2则s2作为开始
    if(s1 <= s2) {//[1, 5] [4, 8]
        // 存在common
        if(s2 <= e1) {//==>4 < 5 => 5-1<4 no=> arr1++
            const isOK = checkDuration(s2, e1, duration);
            return isOK || -1;
        } else {//[1, 3] [4, 5]=>4 >  3=> arr1++=> -1 👌🏻
            return -1;
        }
    } else {
        if(s1 <= e2) {
            const isOK = checkDuration(s1, e2, duration);
            return isOK || 1;
        } else {
            return 1;
        }
    }
}
const getCommonPri = (arr1 = [[]], arr2 = [[]], duration = 1) => {
    const sArr1 = arr1.sort((a, b) => {
        return a[1] - b[1];
    })
    const sArr2 = arr2.sort((a, b) => {
        return a[1] - b[1];
    });
    const len1 = sArr1.length;
    const len2 = sArr2.length;
    let i = 0;
    let j = 0;
    while(i < len1 && j < len2) {
        const common = getCommon(sArr1[i], sArr2[j], duration);
        if(common === 1) {
            j++
        } else if (common === -1) {
            i++
        } else {
            return common;
        }
    }
};

console.log(getCommonPri([['0709', '0720'], ['0108', '0120'], ['1512','1612']], [['0300', '0312'], ['0614', '0714']], 4))