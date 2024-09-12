import React, { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { getRandomColor, graphColors } from './Constant'

function DashboardPie({ allData }) {
    const [graphData, setGraphData] = useState([])

    const countByNameAndStatus = (data) => {
        // Create a map to store counts of each name
        const nameCounts = data?.reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + Number(item.holdamount);
            return acc;
        }, {});
        // Convert the map to the desired output format
        const mainData = Object.keys(nameCounts)?.map(name => ({
            name: name,
            value: nameCounts[name],

        }));
        const modifyColor = mainData?.map((item) => ({ ...item, fill: getRandomColor() }))
        setGraphData(modifyColor);
    }

    useEffect(() => {
        if (allData.data) {
            countByNameAndStatus(allData?.data);
        }
    }, [allData])

    return (
        
        <PieChart width={400} height={300}>
            <Pie
                data={graphData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
                innerRadius={40}
            >
                {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={graphColors[index % graphColors.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    )
}

export default DashboardPie