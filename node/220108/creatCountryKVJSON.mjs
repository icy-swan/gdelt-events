import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();
const originData = {};
fs.createReadStream(path.resolve(__dirname, 'node', 'input', 'country.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        const {countrycode: countryCode, countryname: countryName, '是否一带一路': isYDYL, '是否东盟': isDM, '是否北美自由贸易区': isBMZM, '是否欧盟': isOM, '洲': region1, '洲2': region} = row;
        originData[countryCode] = {
            countryName,
            isYDYL,
            isDM,
            isBMZM,
            isOM,
            region,
        }
    })
    .on('end', (rowCount) => {
        fs.writeFile(path.resolve(__dirname, 'node', '220108', 'country.json'), JSON.stringify(originData), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing country JSON Object to File.");
                return console.log(err);
            }
            console.log("country JSON report has been saved.");
        });
    });