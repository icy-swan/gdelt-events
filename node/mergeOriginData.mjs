import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();

const coutryData = {};

fs.createReadStream(path.resolve(__dirname, 'node', 'input', 'country.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        const { countrycode: countryCode, countryname: countryName, '是否一带一路': isYDYL, '是否东盟': isDM, '是否北美自由贸易区': isBMZM, '是否欧盟': isOM, '洲': region } = row;
        coutryData[countryCode] = {
            coutryData,
            countryName,
            isYDYL,
            isDM,
            isBMZM,
            isOM,
            region,
        }
    })
    .on('end', (rowCount) => {
        fs.createReadStream(path.resolve(__dirname, 'node', 'output', 'origin.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
                //TODO 
            })
            .on('end', (rowCount) => {
                csv.writeToPath(path.resolve(__dirname, 'node', 'output', `mergedOriginData.csv`), rows)
                .on('error', err => console.error(err))
                .on('finish', () => console.log('Done writing.'));
            });
    });