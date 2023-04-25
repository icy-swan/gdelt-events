/**
 * 原文件放到origin目录内
 * 生成的文件，在output目录内，文件名会增加”merge_"的前缀
 * 每次运行会自动删除旧内容生成新内容
 */
import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

const __dirname = path.resolve();

// 原始文件名复制到引号内
const fileName = "ICIO2021_2018_1";
// 合并后的列的后缀（国家_后缀）
const mergeNameGroup = ["ALICE99", "ALICE16"];
// 需要进行合并的列的后缀，可以增加更多或替换
const mergeTextArrGroup = [
    ["05T06", "19"],
    ["10T12", "13T15", "16", "17T18", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31T33"]
];

const mergeSetGroup = [];
const mergeDataMapGroup = [];
const mergeDataColGroup = [];
// 统计下待合并的类型的数量，用于校验
let mergeTextArrGroupDataCount = 0;

mergeTextArrGroup.forEach(v => {
    mergeTextArrGroupDataCount += v.length;
    mergeSetGroup.push(new Set(v));
    mergeDataMapGroup.push(new Map());
    mergeDataColGroup.push(new Map());

})

const header = [];
const rows = [];
// 缓存原始的列头
let originHeader;
// 缓存所有国家，用于校验
const allCountry = new Set();
// 统计耗时
const start = new Date().getTime();

let initHeader = false;
function createHeader(row) {
    row.forEach((v, i) => {
        if (v === "" || v === "") {
            return header.push(v);
        }
        const [country, code] = v.split("_");
        // 处理total
        if (!country || !code) {
            header.push(v);
            return;
        }
        allCountry.add(country);
        let finded;
        mergeSetGroup.forEach((mergeSet, index) => {
            if (0 === index) {
                finded = false;
            }
            // 如果是待merge
            if (mergeSet.has(code)) {
                finded = true;
                const mergeDataMap = mergeDataMapGroup[index];
                // 找到当前待merge的map
                let curMergeDataMap = mergeDataMap.get(country);
                if (curMergeDataMap) {
                    // 写入新的index，更新count
                    curMergeDataMap = curMergeDataMap + 1;
                    mergeDataMap.set(country, curMergeDataMap);
                    // 如果最后一个待merge的index也找到，写入
                    if (curMergeDataMap === mergeSet.size) {
                        header.push([country, mergeNameGroup[index]].join("_"));
                    }
                } else {
                    mergeDataMap.set(country, 1);
                }
                mergeDataMapGroup[index] = mergeDataMap;
            } else {
                // 如果遍历到最后一个还没有，直接push
                if (finded === false && index === (mergeTextArrGroup.length - 1)) {
                    header.push(v);
                }
            }
        })
    });
    // 验证逻辑
    console.log("header len: ", header.length);
    console.log("country size: ", allCountry.size);
    console.log("row length: ", row.length);
    if (header.length !== row.length - (allCountry.size) * (mergeTextArrGroupDataCount - mergeTextArrGroup.length)) {
        console.log(`❎FAIL the test of count - ${header.length} cols`);
    } else {
        console.log(`🎉PASS the test of count - ${header.length} cols`);
    }
}
function createData(row) {
    const [dataType] = row;
    const [country, code] = dataType.split('_');
    const finalRow = [dataType];
    const mergeRowDataMapGroup = [];
    mergeTextArrGroup.forEach(() => mergeRowDataMapGroup.push(new Map()));
    // 所有行，先处理列的合并
    row.forEach((v, i) => {
        // 第一个数是名称
        if (i == 0) {
            return;
        }
        const value = parseFloat(v);
        // 获取当前列，列的国家和code
        const [curCountry, curCode] = originHeader[i].split('_');
        let finded = false;
        mergeSetGroup.forEach((mergeSet, index) => {
            // 获取和set对应的缓存区
            let mergeRowDataMap = mergeRowDataMapGroup[index];
            // 如果code需要被合并
            if (mergeSet.has(curCode)) {
                finded = true;
                const curMergeDataMap = mergeRowDataMap.get(curCountry);
                // 第一个写入的，初始化
                if (!curMergeDataMap) {
                    mergeRowDataMap.set(curCountry, {
                        count: 1,
                        total: value,
                    })
                } else {
                    // 更新缓存
                    const nextDataRow = {
                        count: curMergeDataMap.count + 1,
                        total: curMergeDataMap.total + value,
                    };
                    mergeRowDataMap.set(curCountry, nextDataRow)
                    // 如果处理到最后一位，进行填写
                    if (nextDataRow.count === mergeSet.size) {
                        finalRow.push(nextDataRow.total);
                    }
                }
                mergeTextArrGroup[index] = curMergeDataMap;
            } else {
                // 如果两轮遍历都没有找到该code，直接存入
                if (index === (mergeTextArrGroup.length - 1) && finded === false) {
                    finalRow.push(value);
                }
            }
        })
    });
    // 再判断当前行是否是待处理的行
    // 进行行存储或合并
    let finded = false;
    if (code) {
        mergeSetGroup.forEach((mergeSet, index) => {
            // 如果当前行也是待合并的行，需要多行合并为1行
            if (mergeSet.has(code)) {
                finded = true;
                const mergeDataCol = mergeDataColGroup[index];
                const curMergeDataCol = mergeDataCol.get(country);
                // 如果对应的col的存储空间没有内容，存入
                if (!curMergeDataCol) {
                    mergeDataCol.set(country, {
                        count: 1,
                        data: [finalRow]
                    });
                } else {
                    // 已有则新写入data内
                    const nextData = Array.from(curMergeDataCol.data);
                    nextData.push(finalRow);
                    const nextMergeData = {
                        count: curMergeDataCol.count + 1,
                        data: nextData,
                    };
                    mergeDataCol.set(country, nextMergeData)
                    // 如果处理到最后一位，进行填写
                    if (nextMergeData.count === mergeSet.size) {
                        // 进行行合并
                        const mergedRow = nextData.reduce((pre, next) => {
                            return pre.map((v, i) => {
                                if (i === 0) {
                                    return [country, mergeNameGroup[index]].join('_');
                                } else {
                                    return v + next[i];
                                }
                            })
                        })
                        if (mergedRow.length !== header.length) {
                            console.log('❎FAIL the row test of count');
                            debugger
                        }
                        rows.push(mergedRow);
                        // 更新了数据清空缓存区
                        // mergeDataCol.delete(country);
                    }
                }
                // 更新存储区数据
                mergeDataColGroup[index] = mergeDataCol;
            }
        })
        if(!finded) {
            rows.push(finalRow);
        }
    }else {
        if (finalRow.length !== header.length) {
            console.log('❎FAIL the row test of count');
            debugger
        }
        rows.push(finalRow);
    }
}
fs.createReadStream(
    path.resolve(__dirname, "node", "20230415", "origin", `${fileName}.csv`)
)
    .pipe(csv.parse())
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
        if (initHeader === false) {
            createHeader(row);
            originHeader = row;
            initHeader = true;
            mergeDataMapGroup.splice(0, mergeDataMapGroup.length);
        } else {
            createData(row);
        }
    })
    .on("end", (rowCount) => {
        const end = new Date().getTime();
        const rowsCount = rows.length;
        if (rowsCount !== (rowCount - (allCountry.size) * (mergeTextArrGroupDataCount - mergeTextArrGroup.length) - 1)) {
            debugger
            console.log('❎FAIL the col test of count');
        } else {
            console.log('🎉PASS the col test of count');
        }

        csv.writeToPath(
                path.resolve(
                    __dirname,
                    "node",
                    "20230415",
                    "output",
                    `merged-${fileName}.csv`
                ),
                rows,
                {
                    headers: header,
                    writeHeaders: true
                }
            )
            .on("error", (err) => console.error(err))
            .on("finish", () => {
                const usedTime = (end - start) / 1000;
                console.log(
                    `finished ${1}/${1}, merge ${rowCount} to ${rowsCount}, use ${usedTime.toFixed(3)}s, Done writing.`
                );
            });
    });
