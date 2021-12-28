import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();

function cleanupData(fileName) {
    const urls = {};
    const rows = [
        ['YEAR','Actor2CountryCode','SOURCEURL','RecordCount'],
    ]
    fs.createReadStream(path.resolve(__dirname, 'node', '1221', 'input', `${fileName}.csv`))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            const {YEAR,Actor2CountryCode,SOURCEURL, RecordCount } = row;
            // 没有就插入
            if(!urls[SOURCEURL]) {
                urls[SOURCEURL] = [YEAR,Actor2CountryCode,SOURCEURL, RecordCount];
            } else {
                // 重复就删除
                urls[SOURCEURL] = null;
            }
        })
        .on('end', (rowCount) => {
            const keys = Object.keys(urls);
            keys.forEach((k)=> {
                if(urls[k] !== null) {
                    rows.push(urls[k]);
                }
            })
            csv.writeToPath(path.resolve(__dirname, 'node', '1221', 'output', `${fileName}.csv`), rows)
                .on('error', err => console.error(err))
                .on('finish', () => console.log('Done writing.'));
        });
}

cleanupData('all-with-url');