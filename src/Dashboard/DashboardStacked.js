import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { graphColors } from './Constant'

function DashboardStacked({ allData }) {

    const [graphData, setGraphData] = useState([])

    useEffect(() => {
        if (allData.data) {
            const checkNullArray = allData?.data?.filter(item => item !== null)
            setGraphData(checkNullArray);
        }
    }, [allData])

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iponame" />
                <YAxis />
                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{
                        display: 'flex',
                        flexDirection: 'row',           // Lay legend items horizontally
                        flexWrap: 'wrap',               // Allow wrapping of items in small screens
                        justifyContent: 'center',       // Center legend items
                        alignItems: 'center',           // Align items vertically
                        width: '100%',                  // Ensure it fits the container width
                        marginTop: '20px',           // Space between legend and chart
                        overflow: 'hidden',             // Prevent overflow
                        textOverflow: 'ellipsis',       // Handle overflowed text
                        whiteSpace: 'nowrap',           // Prevent breaking of text
                    }}
                />
                <Bar dataKey="cutOffPrice1" stackId="a" fill="#8884d8" />
                <Bar dataKey="cutOffPrice2" stackId="a" fill="#82ca9d" />
                <Bar dataKey="cutOffPrice3" stackId="a" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>

    )
}

export default DashboardStacked