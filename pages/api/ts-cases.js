import fs from "fs";
import path from "path";
import csv from "csv-parser";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export default (req, res) => {
  if (req.method === "GET") {
    let confirmedCases = [];

    fs.createReadStream(path.join(serverRuntimeConfig.PROJECT_ROOT, "/public/data/time_series_19-covid-Confirmed.csv"))
      .pipe(csv())
      .on("data", data => confirmedCases.push(data))
      .on("end", () => {
        // console.log(confirmedCases);
        confirmedCases.map(test => {
          console.log(test["1/22/20"]);
        });
      });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ name: "John Doe" }));
  }
};
