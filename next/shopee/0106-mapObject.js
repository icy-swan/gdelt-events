//arraymap二分查找，增加一倍内容效率降低一倍
//hashmap用hash定位查找，与内容成正比

//1. map的keys是有序的，object是无需。
xx = {2:3, 1:2}
Object.keys(xx)//(2) ['1', '2']
xx = new Map([[2,3], [1,2]]);
Array.from(xx.keys()) //[2,3] Map.keys是iterator
//2. 无默认key。map轻易获取size，key可以是引用数据类型，map是iterable，频繁增删表现优异
//   有原型因而有默认key。object不能，key必须是string，必须获取key后遍历（Object.keys）