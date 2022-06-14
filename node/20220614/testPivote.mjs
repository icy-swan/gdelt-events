import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const __dirname = path.resolve();
const originData = new Map();
let originKeys;
let unFoundData = [];
fs.createReadStream(path.resolve(__dirname, "node", "20220614", "all.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    const { SOURCEURL } = row;
    originData.set(SOURCEURL, 1);
  })
  .on("end", (rowCount) => {
    fs.createReadStream(path.resolve(__dirname, "node", "20220614", "unit.csv"))
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        const {SOURCEURL, GLOBALEVENTID, MonthYear, QuadClass, Actor1CountryCode, Actor2CountryCode, SubEventType, GoldsteinScale} = row;
        if(originData.has(SOURCEURL)) {
          originData.delete(SOURCEURL)
        }
      })
      .on("end", (rowCount) => {
        originKeys = Array.from(originData.keys());
        // csv.writeToPath(path.resolve(__dirname, 'node', '20220614', `404.csv`), unFoundData)
        //         .on('error', err => console.error(err))
        //         .on('finish', () => console.log('Done writing.'));
        fs.writeFile(path.resolve(__dirname, 'node', '20220614', '404.json'), JSON.stringify(originKeys.length), 'utf8', function (err) {
          if (err) {
              console.log("An error occured while writing country JSON Object to File.");
              return console.log(err);
          }
          console.log("country JSON report has been saved.");
      });
      });
  });