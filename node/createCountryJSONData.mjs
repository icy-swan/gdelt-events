import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();

const countryData = {
    isYDYL: {
        all: [],
    },
    isDM: {
        all: [],
    },
    isBMZM: {
        all: [],
    },
    isOM: {
        all: [],
    },
    region: {}
};
fs.createReadStream(path.resolve(__dirname, 'node', 'input', 'country.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        const {countrycode: countryCode, countryname: countryName, '是否一带一路': isYDYL, '是否东盟': isDM, '是否北美自由贸易区': isBMZM, '是否欧盟': isOM, '洲': region1, '洲2': region} = row;
        if(!region) {
            return;
        }
        const buildData = {
            countryCode,
            countryName,
            region,
            isYDYL,
            isDM,
            isBMZM,
            isOM,
        }
        let regData = null;
        // 一带一路写入
        if('1' === isYDYL) {
            countryData.isYDYL.all.push(buildData);
            regData = countryData.isYDYL[region];
            if(!regData) {
                regData = [];
            }
            regData.push(buildData);
            countryData.isYDYL[region] = regData;
        }
        // 东盟
        if('1' === isDM) {
            countryData.isDM.all.push(buildData);
            regData = countryData.isDM[region];
            if(!regData) {
                regData = [];
            }
            regData.push(buildData);
            countryData.isDM[region] = regData;
        }
        // 北美自由贸易区
        if('1' === isBMZM) {
            countryData.isBMZM.all.push(buildData);
            regData = countryData.isBMZM[region];
            if(!regData) {
                regData = [];
            }
            regData.push(buildData);
            countryData.isBMZM[region] = regData;
        }
        // 欧盟
        if('1' === isOM) {
            countryData.isOM.all.push(buildData);
            regData = countryData.isOM[region];
            if(!regData) {
                regData = [];
            }
            regData.push(buildData);
            countryData.isOM[region] = regData;
        }
        // 洲
        regData = countryData.region[region];
        if(!regData) {
            regData = [];
        }
        regData.push(buildData);
        countryData.region[region] = regData;
    })
    .on('end', (rowCount) => {
        fs.writeFile(path.resolve(__dirname, 'node', 'output', 'countryData.json'), JSON.stringify(countryData), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing countryData JSON Object to File.");
                return console.log(err);
            }
            console.log("countryData JSON report has been saved.");
        });
    });

//