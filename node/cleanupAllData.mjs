import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();

function cleanupData(fileName) {
    fs.createReadStream(path.resolve(__dirname, 'node', 'input', `${fileName}.csv`))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            //todo cleanup data
        })
        .on('end', (rowCount) => {
            // todo format
        });
}

['origin', 'origin-c1', 'origin-c2', 'origin-c3'].forEach(c => {
    cleanupData(c);
})
