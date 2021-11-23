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

function cleanupData(fileName) {
    // 输出
    let rows = [];

    // 页头相关
    let isHeader = true;
    let header = null;
    let hasQuadClass = false;
    let indexOfYear;
    let indexOfCountry;
    let indexOfQuardClass;

    // 数据补全判断
    let currentYear = null;
    let currentCountry = null;
    let tempQuardClassObj = null;


    fs.createReadStream(path.resolve(__dirname, 'node', 'input', `${fileName}.csv`))
        .pipe(csv.parse())
        .on('error', error => console.error(error))
        .on('data', row => {
            debugger
            // 写入页头
            if(isHeader) {
                header = row;
                rows.push(row);
                indexOfYear = header.indexOf('YEAR');
                indexOfCountry = header.indexOf('Actor2CountryCode');
                indexOfQuardClass = header.indexOf('QuardClass');
                // 判断是否有quardClass的分类
                if(indexOfQuardClass !== -1) {
                    hasQuadClass = true;
                }
                isHeader = false;
            } else {
                //依次读取每年的数据，进行数据补齐
                const year = row.indexOf(indexOfYear);
                const country  = row.indexOf(indexOfCountry);
                // 换一年后，currentCountry, tempQS要重置
                if(year !== currentYear) {
                    currentCountry = null;
                    tempQuardClassObj = null;
                }
                // 如果存在quadClass，country会重复出现。并需要补齐
                // 如果国家一致
                if(currentCountry === country) {
                    if(hasQuadClass) {
                        const quardClass = row.indexOf(indexOfQuardClass);

                    } else {
                        throw new Error('没有quardClass的数据，出现了国家的重复');
                    }
                } else {
                    // 更换国家，先将qs对象重置
                    tempQuardClassObj = null;
                }
            }
        })
        .on('end', (rowCount) => {
            return;
            csv.writeToPath(path.resolve(__dirname, 'node', 'output', `${fileName}.csv`), rows)
                .on('error', err => console.error(err))
                .on('finish', () => console.log('Done writing.'));
        });
}

['origin', 'origin-c1', 'origin-c2', 'origin-c3'].forEach(c => {
    cleanupData(c);
})
