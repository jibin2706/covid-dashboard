import globalData from "../../public/data/time-series.json";
import { Chart } from "frappe-charts/dist/frappe-charts.min.cjs";

function TimeseriesGraph() {
  React.useEffect(() => {
    const data = {
      labels: Object.keys(globalData.confirmed).map(key => key),
      datasets: [
        {
          type: "line",
          values: Object.keys(globalData.confirmed).map(
            key => globalData.confirmed[key]
          )
        },
        {
          type: "line",
          values: Object.keys(globalData.deaths).map(
            key => globalData.deaths[key]
          )
        },
        {
          type: "line",
          values: Object.keys(globalData.recovered).map(
            key => globalData.recovered[key]
          )
        }
      ]
    };

    new Chart("#chart", {
      data: data,
      type: "line",
      width: "100vw",
      height: 500,
      colors: ["#3366ff", "ff3300", "#339966"],
      axisOptions: {
        xIsSeries: true,
        yIsSeries: true
      },
      lineOptions: {
        hideDots: 1,
        regionFill: 1
      }
    });
  }, []);
  return (
    <div>
      <div id="chart"></div>
    </div>
  );
}

export default TimeseriesGraph;
