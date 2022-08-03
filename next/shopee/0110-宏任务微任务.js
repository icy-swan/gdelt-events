async function async1() {
  console.log("async1 start");// 同步代码2
  await async2();// 调用async2(),async2()的返回值是promise，不执行promise的resolve,让出线程。将promise加入异步队列
  console.log("async1 end");//异步2（await会产生一个promise的resolve，进入异步队列，是个空的）。执行，到下一个异步队列（promise的resolve），异步队列空了，再到await的resolve
}

async function async2() {
  console.log("async2");// 同步代码3
}

console.log("script start"); // 同步代码1

setTimeout(function () {
    // 异步 setTimeout放入event-loop中的macro-tasks队列，暂不执行
    // 因为setTimeout（）的优先级低于promise，所以会优先执行promise队列。
  console.log("settimeout");//异步3
});

async1();

new Promise(function (resolve) {
  console.log("promise1");// 同步代码4
  resolve();
}).then(function () {
  console.log("promise end");// 不执行，加入异步队列//异步1
});

console.log("script end");// 同步代码5
