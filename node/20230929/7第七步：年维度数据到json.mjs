import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();

const originData = {};//year-country-{count,gs}结构
fs.createReadStream(path.resolve(__dirname, 'node', '20230929', '2015-2023-基础数据.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        const {YEAR,Actor2CountryCode: CountryCode, GoldsteinScale, 'Record Count': RecordCount} = row;
        if(!originData[YEAR]) {
            originData[YEAR] = {};
        }
        let curYearData = originData[YEAR];
        if(!curYearData[CountryCode]) {
            curYearData[CountryCode] = {
                GoldsteinScale: 0,
                RecordCount: 0,
            };
        }
        curYearData[CountryCode].GoldsteinScale += parseFloat(GoldsteinScale);
        curYearData[CountryCode].RecordCount += parseInt(RecordCount);
        originData[YEAR] = curYearData;
    })
    .on('end', (rowCount) => {
        fs.writeFile(path.resolve(__dirname, 'node', '20230929', 'yearOriginData.json'), JSON.stringify(originData), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing originData JSON Object to File.");
                return console.log(err);
            }
            console.log("yearOriginData JSON report has been saved.");
        });
    });