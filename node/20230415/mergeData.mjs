import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

const __dirname = path.resolve();

const fileName = "ICIO2021_2018";
const mergeName = "ALICE99";
const mergeTextArr = ["05T06", "19"];

const mergeSet = new Set(mergeTextArr);
const mergeDataMap = new Map();
// {
//     'aus': {
//         '05T06': 3,
//         '19': 4,
//         mergeIndex: 5,
//     }
// }
const header = [];
const rows = [];

// 缓存所以国家，用于校验
const allCountry = new Set();

let initHeader = false;
const start = new Date().getTime();
fs.createReadStream(
  path.resolve(__dirname, "node", "20230415", "origin", `${fileName}.csv`)
)
  .pipe(csv.parse())
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    if (initHeader === false) {
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
          const curMergeDataMap = mergeDataMap.get(country);
          if (curMergeDataMap) {
            // 写入新的index，更新count
            curMergeDataMap[code] = i;
            curMergeDataMap.count = curMergeDataMap.count + 1;
            mergeDataMap.set(country, curMergeDataMap);
            // 如果最后一个待merge的index也找到，写入
            if (curMergeDataMap.count === mergeSet.size) {
              header.push([country, mergeName].join("_"));
            }
          } else {
            const initData = {
              count: 1,
            };
            initData[code] = i;
            mergeDataMap.set(country, initData);
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
      }
      initHeader = true;
    }
  })
  .on("end", (rowCount) => {
    const end = new Date().getTime();
    rows.push(header);
    csv
      .writeToPath(
        path.resolve(
          __dirname,
          "node",
          "20230415",
          "output",
          `merged-${fileName}.csv`
        ),
        rows
      )
      .on("error", (err) => console.error(err))
      .on("finish", () =>
        console.log(
          `finished ${rowCount} rowCount, use ${end - start} ms, Done writing.`
        )
      );
  });
