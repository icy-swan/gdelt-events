const nums = [3, 1, 8];

function permuteData(nums) {
  const result = [];
  const len = nums.length;
  function permute(visited, item) {
    for (let i = 0; i < len; i++) {
      if (!visited[i]) {
        item.push(nums[i]);
        visited[i] = true;
        if (len === item.length) {
          result.push(Array.from(item));
          visited[i] = false;
          item.pop();
        } else {
          permute(visited, item);
          visited[i] = false;
          item.pop();
        }
      }
    }
  }
  permute([], []);
  return result;
}
console.log(permuteData(nums));
