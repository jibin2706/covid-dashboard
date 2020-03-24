import fetch from "node-fetch";

export default async (req, res) => {
  let totalGlobalCases = { confirmed: 0, deaths: 0, recovered: 0 };

  if (req.method === "GET") {
    await fetch("https://covid19.mathdro.id/api/")
      .then(response => {
        return response.json();
      })
      .then(result => {
        totalGlobalCases = {
          confirmed: result.confirmed.value,
          deaths: result.deaths.value,
          recovered: result.recovered.value
        };
      });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(totalGlobalCases));
  }
};
