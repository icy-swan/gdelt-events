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
const fileName = "ICIO2021_2018";
// 合并后的列的后缀（国家_后缀）
const mergeName = "ALICE99";
// 需要进行合并的列的后缀，可以增加更多或替换
const mergeTextArr = ["05T06", "19";

const mergeSet = new Set(mergeTextArr);
const mergeDataMap = new Map();
const mergeDataCol = new Map();
const header = [];
const rows = [];
// 缓存原始的列头
let originHeader;
// 缓存所以国家，用于校验
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
    // 如果是待merge
    if (mergeSet.has(code)) {
      // 找到当前待merge的map
      let curMergeDataMap = mergeDataMap.get(country);
      if (curMergeDataMap) {
        // 写入新的index，更新count
        curMergeDataMap = curMergeDataMap + 1;
        mergeDataMap.set(country, curMergeDataMap);
        // 如果最后一个待merge的index也找到，写入
        if (curMergeDataMap === mergeSet.size) {
          header.push([country, mergeName].join("_"));
        }
      } else {
        mergeDataMap.set(country, 1);
      }
    } else {
      header.push(v);
    }
  });
  // 验证逻辑
  console.log("header len: ", header.length);
  console.log("country size: ", allCountry.size);
  console.log("row length: ", row.length);
  if (header.length !== row.length - allCountry.size) {
    const diffRowToHeader = [];
    for (let key in row) {
      const val = row[key];
      if (!header.includes(val)) {
        diffRowToHeader.push(val);
        const [c] = val.split("_");
        // 如果row内的值在不header，不是组合新名字，不是total，看下情况
        if (!header.includes([c, mergeName].join("_")) && val !== "TOTAL") {
          debugger;
        }
      }
    }
    const diffHeaderToRow = [];
    for (let key in header) {
      const val = header[key];
      if (!row.includes(val)) {
        diffHeaderToRow.push(val);
      }
    }
    for (let key in diffHeaderToRow) {
      const val = diffHeaderToRow[key];
      const [con, code] = val.split("_");
      // 如果header相对于row的新增内容的国家，不在国家列表内
      if (!allCountry.has(con) || code !== mergeName) {
        debugger;
      }
    }
    console.log('❎FAIL the test of count');
  } else {
    console.log('🎉PASS the test of count');
  }
}
function createData(row) {
  const [dataType] = row;
  const [country, code] = dataType.split('_');
  const finalRow = [dataType];
  const mergeRowDataMap = new Map();
  // 所有行，先处理列的合并
  row.forEach((v, i)=> {
    // 第一个数是名称
    if(i == 0) {
      return;
    }
    const value = parseFloat(v);
    // 获取当前列，列的国家和code
    const [curCountry, curCode] = originHeader[i].split('_');
    // 如果code需要被合并
    if(mergeSet.has(curCode)) {
      const curMergeDataMap = mergeRowDataMap.get(curCountry);
      // 第一个写入的，初始化
      if(!curMergeDataMap) {
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
        if(nextDataRow.count === mergeSet.size) {
          finalRow.push(nextDataRow.total);
        }
      }
    } else {
      finalRow.push(value)
    }
  });
  // 再判断当前行是否是待处理的行
  // 进行行存储或合并
  if(code && mergeSet.has(code)) {
    const curMergeDataCol = mergeDataCol.get(country);
    if(!curMergeDataCol) {
      mergeDataCol.set(country, {
        count: 1,
        data: [finalRow]
      });
    } else {
      const nextData = Array.from(curMergeDataCol.data);
      nextData.push(finalRow);
      const nextMergeData = {
        count: curMergeDataCol.count +1,
        data: nextData,
      };
      mergeDataCol.set(country, nextMergeData)
      // 如果处理到最后一位，进行填写
      if(nextMergeData.count === mergeSet.size) {
        // 进行行合并
        const mergedRow = nextData.reduce((pre, next)=> {
          return pre.map((v, i) => {
            if(i === 0) {
              return [country, mergeName].join('_');
            } else {
              return v + next[i];
            }
          })
        })
        if(mergedRow.length !== header.length) {
          console.log('❎FAIL the row test of count');
          debugger
        }
        rows.push(mergedRow);
      }
    }
  } else {
    if(finalRow.length !== header.length) {
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
      mergeDataMap.clear();
    } else {
      createData(row);
    }
  })
  .on("end", (rowCount) => {
    const end = new Date().getTime();
    const rowsCount = rows.length;
    if(rowsCount !== (rowCount - allCountry.size - 1)) {
      console.log('❎FAIL the col test of count');
    } else {
      console.log('🎉PASS the col test of count');
    }

    csv
      .writeToPath(
        path.resolve(
          __dirname,
          "node",
          "20230415",
          "output",
          `merged-${fileName}.csv`
        ),
        rows, {
          headers: header,
          writeHeaders: true
        }
      )
      .on("error", (err) => console.error(err))
      .on("finish", () => {
        const usedTime = (end - start) / 1000;
        console.log(
          `finished ${1}/${3}, merge ${rowCount} to ${rowsCount}, use ${usedTime.toFixed(3)}s, Done writing.`
        );
      });
  });
