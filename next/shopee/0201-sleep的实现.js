function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const t1 = +new Date();
sleep(3000).then(() => {
  const t2 = +new Date();
  console.log(t2 - t1);
});
