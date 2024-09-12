import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';
import { getRandomColor } from './Constant';

function DashboardPieChartHalf({ allData }) {

  const [graphData, setGraphData] = useState([])

  const countByNameAndStatus = (data) => {
      // Create a map to store counts of each name
      const nameCounts = data?.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          return acc;
      }, {});


      // Convert the map to the desired output format
      const mainData = Object.keys(nameCounts)?.map(name => ({
          name: name,
          value: nameCounts[name],

      }));
      const modifyColor = mainData?.map((item)=> ({...item, fill: getRandomColor()}))
      setGraphData(modifyColor);
  }

  useEffect(() => {
      if (allData.data) {
          countByNameAndStatus(allData?.data);
      }
  }, [allData])

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name  }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
          <text x={x} y={y} fill="white" fontSize={10} textAnchor={'middle'} dominantBaseline="central">
              {value} -{name}
          </text>
      );
  };


  return (
    <PieChart width={200} height={200}>
      <Pie
        animationBegin={true}
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={graphData}
        cx="50%"
        cy="50%"
        outerRadius={80}
        label={renderCustomizedLabel}
      />
      <Tooltip />
    </PieChart>
  );
}
export default DashboardPieChartHalf