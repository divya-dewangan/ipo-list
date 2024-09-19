import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { getRandomColor, graphColors } from './Constant'

function DashboardBar({ allData }) {
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
        <ResponsiveContainer  height={300}>
        <BarChart height={300} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend dataKey="createdDate" />
            <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
    )
}

export default DashboardBar