import { Tooltip, AreaChart, Area, ResponsiveContainer } from "recharts";

import globalData from "../../public/data/time-series.json";

let data = [];
data = Object.keys(globalData.confirmed).map(item => {
  return {
    name: item,
    confirmed: globalData.confirmed[item],
    deaths: globalData.deaths[item],
    recovered: globalData.recovered[item]
  };
});

function TimeseriesGraph() {
  return (
    <ResponsiveContainer>
      <AreaChart data={data} width={400} height={300}>
        <Area
          stackId="1"
          type="linear"
          dataKey="deaths"
          stroke="#dc3545"
          fill="#dc3545"
        />
        <Area
          stackId="1"
          type="monotone"
          dataKey="recovered"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          stackId="1"
          type="monotone"
          dataKey="confirmed"
          stroke="#ffc107"
          fill="#ffc107"
        />

        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TimeseriesGraph;
