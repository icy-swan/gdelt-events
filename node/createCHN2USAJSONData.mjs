import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();

const chn2usa = {
};
fs.createReadStream(path.resolve(__dirname, 'node', 'input', 'chn2usa.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        const { YEAR, MonthYear, SubEventType, 'Record Count': RecordCount } = row;
        let yearData = chn2usa[YEAR];
        if(!yearData) {
            yearData = {};
        }
        let monthData = yearData[MonthYear];
        if(!monthData) {
            monthData = {};
        }
        monthData[SubEventType] = parseInt(RecordCount);
        // 回写数据
        yearData[MonthYear] = monthData;
        chn2usa[YEAR] = yearData;
    })
    .on('end', (rowCount) => {
        fs.writeFile(path.resolve(__dirname, 'node', 'output', 'chn2usa.json'), JSON.stringify(chn2usa), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing chn2usa JSON Object to File.");
                return console.log(err);
            }
            console.log("chn2usa JSON report has been saved.");
        });
    });