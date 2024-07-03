import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();

const originData = {};//year-country-{count,gs}结构
fs.createReadStream(path.resolve(__dirname, 'node', '20240626', 'all.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        const {MonthYear,Actor2CountryCode: CountryCode, SubEventType, "Record Count": RecordCount} = row;
        if(!originData[CountryCode]) {
            originData[CountryCode] = {};
        }
        let d = originData[CountryCode];
        if(!d[MonthYear]) {
            d[MonthYear] = {};
        }
        d[MonthYear][SubEventType] = RecordCount;
        originData[CountryCode] = d;
    })
    .on('end', (rowCount) => {
        fs.writeFile(path.resolve(__dirname, 'node', '20240626', 'originData.json'), JSON.stringify(originData), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing originData JSON Object to File.");
                return console.log(err);
            }
            console.log("originData JSON report has been saved.");
        });
    });