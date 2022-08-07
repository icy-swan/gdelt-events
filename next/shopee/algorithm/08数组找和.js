const ca = [10, 1, 2, 7, 6, 1, 5],
  tar = 8;
const getCombin = (ca = [], tar = 0) => {
  var res = [];
  ca = ca.sort((a, b) => a - b);
  function dfs(i, sum, ans) {
    if (sum > tar) return;
    if (sum == tar) {
      res.push([...ans]);
    }
    for (i; i < ca.length; i++) {
      sum += ca[i];
      ans.push(ca[i]);
      dfs(i + 1, sum, ans);
      sum -= ca[i];
      ans.pop();
      while (ca[i + 1] == ca[i]) i++;
    }
  }
  dfs(0, 0, []);
  return res;
};
