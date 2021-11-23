import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();
const countryList = ["AFG","AGO","ARE","ARG","ARM","ATG","AUS","AUT","AZE","BEL","BGD","BGR","BHR","BIH","BLR","BMU","BOL","BRA","BRN","BWA","CAN","CHE","CHL","CMR","COD","COG","COL","CRI","CUB","CYM","CYP","CZE","DEU","DJI","DNK","DOM","DZA","ECU","EGY","ESP","EST","ETH","FIN","FJI","FRA","FSM","GAB","GBR","GEO","GHA","GIN","GNB","GRC","GUY","HKG","HND","HRV","HTI","HUN","IDN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JOR","JPN","KAZ","KEN","KGZ","KHM","KOR","KWT","LAO","LBN","LBR","LKA","LTU","LUX","LVA","MAC","MAR","MDA","MDG","MEX","MKD","MLI","MLT","MMR","MNE","MNG","MOZ","MUS","MWI","MYS","NAM","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","PAK","PAN","PER","PHL","PNG","POL","PRK","PRT","PRY","QAT","ROM","RUS","RWA","SAU","SDN","SEN","SGP","SLE","SLV","SOM","SRB","SUR","SVK","SVN","SWE","SYR","TCD","TGO","THA","TJK","TKM","TTO","TUN","TUR","TZA","UGA","UKR","URY","USA","UZB","VEN","VNM","VUT","YEM","ZAF","ZMB","ZWE"];
const originTempQS = {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
};

// 补全数据
function fillCoutryData(target, lastYear, startIndex, endIndex, hasQuadClass) {
    const tempArr = [lastYear];
    const dataArr = [0, 0];
    for(let i = (startIndex +1); i < endIndex; i++) {
        const country = [countryList[i]];
        if(hasQuadClass) {
            for(let j = 1; j <=4; j++) {
                target.push(tempArr.concat(country, [j + ''], dataArr));
            }
        } else {
            target.push(tempArr.concat(country, dataArr))
        }
    }
}

function fillQSData(rows, tempQuadClassObj, lastRow, indexOfQuadClass) {
    Object.keys(tempQuadClassObj).forEach(k => {
        // 发现缺失，插入数据
        if(tempQuadClassObj[k] === false) {
            const tempRow = Array.from(lastRow);
            tempRow[indexOfQuadClass] = k;
            // gs补0
            tempRow[indexOfQuadClass + 1] = 0;
            // count补0
            tempRow[indexOfQuadClass + 2] = 0;
            // !important 写入数据 - 写入补齐的上个国家的缺失的qs的数据
            rows.push(tempRow);
        }
    })
}
function cleanupData(fileName) {
    // 输出
    let rows = [];

    // 页头相关
    let isHeader = true;
    let header = null;
    let hasQuadClass = false;
    let indexOfYear;
    let indexOfCountry;
    let indexOfQuadClass;

    // 数据补全判断
    let lastYear = null;
    let lastCountry = null;
    let tempQuadClassObj = Object.assign({}, originTempQS);
    let lastRow = null;

    fs.createReadStream(path.resolve(__dirname, 'node', 'input', `${fileName}.csv`))
        .pipe(csv.parse())
        .on('error', error => console.error(error))
        .on('data', row => {
            // 写入页头
            if(isHeader) {
                header = row;
                rows.push(row);
                indexOfYear = header.indexOf('YEAR');
                indexOfCountry = header.indexOf('Actor2CountryCode');
                indexOfQuadClass = header.indexOf('QuadClass');
                // 判断是否有quadClass的分类
                if(indexOfQuadClass !== -1) {
                    hasQuadClass = true;
                }
                isHeader = false;
            } else {
                //读取数据
                const year = row[indexOfYear];
                const country  = row[indexOfCountry];
                // 年发生切换
                if(year !== lastYear) {
                    // 非初始态，补齐，补齐后和初始态一致
                    if(null !== lastYear) {
                        // 首先补齐上个国家的qs的数据
                        if(hasQuadClass) {
                            // !important 写入数据 - 补齐上一年的国家的qs数据
                            fillQSData(rows, tempQuadClassObj, lastRow, indexOfQuadClass);
                            // 再将qs对象重置
                            tempQuadClassObj = Object.assign({}, originTempQS);
                        }
                        // 再补齐上一年缺失的国家
                        const lastYearCountryIndex = countryList.indexOf(lastCountry);
                        if(lastYearCountryIndex !== (countryList.length - 1)) {
                            // !important 写入数据 - 补齐上一年的未写入的国家的数据
                            fillCoutryData(rows, lastYear, lastYearCountryIndex, countryList.length, hasQuadClass);
                        }
                    } else {
                        //如果第一个country没有符合顺序，补齐
                        if(countryList.indexOf(country) !== 0) {
                            fillCoutryData(rows, year, -1, countryList.indexOf(country), hasQuadClass);
                        }
                        tempQuadClassObj = Object.assign({}, originTempQS);
                        if(hasQuadClass) {
                            tempQuadClassObj[row[indexOfQuadClass]] = true;
                        }
                    }
                    // !important 写入数据 - 直接写入当前数据
                    rows.push(row);
                } else {
                    // 如果存在quadClass，country会重复出现。并需要补齐
                    // 如果国家一致
                    if(lastCountry === country) {
                        if(hasQuadClass) {
                            const quadClass = row[indexOfQuadClass];
                            // 将该年的qs设置为true
                            tempQuadClassObj[quadClass] = true;
                            // !important 写入数据 - 直接写入当前数据
                            rows.push(row);
                        } else {
                            throw new Error('没有quadClass的数据，出现了国家的重复');
                        }
                    } else {
                        if(hasQuadClass) {
                            const quadClass = row[indexOfQuadClass];
                            // 更换国家，先判断上一个国家的qs数据是否补全了，不全的补全
                            // !important 写入数据 - 补齐上一个国家的qs
                            fillQSData(rows, tempQuadClassObj, lastRow, indexOfQuadClass);
                            // 再将qs对象重置并赋值当前qs
                            tempQuadClassObj = Object.assign({}, originTempQS);
                            tempQuadClassObj[quadClass] = true;
                        }
                        // 更换国家后，判断当前的国家的index和上一个国家的index+1是否一致，如果不一致
                        // 要从上一个国家index+1，补齐到当前国家
                        const lastCountryIndex = countryList.indexOf(lastCountry);
                        const countryIndex = countryList.indexOf(country);
                        if(lastCountryIndex +1 !== countryIndex) {
                            // !important 写入数据 - 插入同年缺失的国家的数据
                            fillCoutryData(rows, lastYear, lastCountryIndex, countryIndex, hasQuadClass);
                        }
                        // !important 写入数据 - 直接写入当前数据
                        rows.push(row);
                    }
                }
                // 缓存当前数据
                lastYear = year;
                lastCountry = country;
                lastRow = Array.from(row);
            }
        })
        .on('end', (rowCount) => {
            csv.writeToPath(path.resolve(__dirname, 'node', 'output', `${fileName}.csv`), rows)
                .on('error', err => console.error(err))
                .on('finish', () => console.log('Done writing.'));
        });
}

// ['origin', 'origin-c1', 'origin-c2', 'origin-c3'].forEach(c => {
//     cleanupData(c);
// })

cleanupData('test');
