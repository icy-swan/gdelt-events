const nums = [3, 1, 8];
// const permuteData = (nums) => {
//   let result = [];
//   const len = nums.length;
//   permute([], []);
//   function permute(visited, item) {
//     for (let i = 0; i < len; i++) {
//       if (!visited[i]) {
//         visited[i] = true;
//         item.push(nums[i]);
//         if (item.length === len) {
//           const newItem = Array.from(item);
//           result.push(newItem);
//           visited[i] = false;
//           item.pop();
//         } else {
//           permute(visited, item);
//           visited[i] = false;
//           item.pop();
//         }
//       }
//     }
//   }
//   return result;
// };

function permuteData(nums) {
    const result = [];
    const len = nums.length;
    function permute(visited, item) {
        for(let i =0; i < len; i++) {
            if(!visited[i]) {
                item.push(nums[i]);
                visited[i] = true;
                if(len === item.length) {
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
