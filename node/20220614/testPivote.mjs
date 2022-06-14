import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();
const originData = new Map();
fs.createReadStream(path.resolve(__dirname, 'node', '20220614', 'all.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        const {SOURCEURL} = row;
        originData.set(SOURCEURL, 1);
    })
    .on('end', (rowCount) => {
        fs.createReadStream(
          path.resolve(__dirname, "node", "20220614", "unit.csv")
        )
          .pipe(csv.parse({ headers: true }))
          .on("error", (error) => console.error(error))
          .on("data", (row) => {
            const { SOURCEURL } = row;
            originData.delete(SOURCEURL);
          })
          .on("end", (rowCount) => {
            fs.writeFile(path.resolve(__dirname, 'node', '20220614', '404.json'), JSON.stringify(Array.from(originData.keys)), 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing country JSON Object to File.");
                    return console.log(err);
                }
                console.log("country JSON report has been saved.");
            });
          });
    });