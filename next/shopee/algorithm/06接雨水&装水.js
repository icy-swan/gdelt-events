const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const getAmout = (height) => {
  const len = height.length;
  let left = 0;
  let right = len - 1;
  let leftMax = 0;
  let rightMax = 0;
  let sum = 0;
  while (left < right) {
    let cur;
    if (height[left] < height[right]) {
      cur = height[left];
      if (cur > leftMax) {
        leftMax = cur;
      } else {
        sum += leftMax - cur;
      }
      left++;
    } else {
      cur = height[right];
      if (cur > rightMax) {
        rightMax = cur;
      } else {
        sum += rightMax - cur;
      }
      right--;
    }
  }
  return sum;
};
getAmout(height);