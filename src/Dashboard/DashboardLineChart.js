import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush, AreaChart, Area } from "recharts";



const DashboardLineChart = ({ allData }) => {

    const [graphData, setGraphData] = useState([])

    // Function to format date as "MMM-YY"
    const formatDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date(date);
        const month = months[d.getMonth()];
        const year = d.getFullYear().toString().slice(-2); // Last two digits of the year
        return `${month}-${year}`;
    };

    const categro = (data) => {
        const monthlyData = data.reduce((acc, item) => {
            const date = formatDate(item.lastDate);
            if (!acc[date]) {
                acc[date] = { name: date, SME: 0, MainBoard: 0 };
            }
            if (item.type === 'SME') {
                acc[date].SME = (acc[date].SME || 0) + 1;
            } else if (item.type === 'Main Board') {
                acc[date].MainBoard = (acc[date].MainBoard || 0) + 1;
            }
            return acc;
        }, {});

        // Convert to array and sort by date
        const convetedData = Object.values(monthlyData).sort((a, b) => {
            const [monthA, yearA] = a.name.split('-');
            const [monthB, yearB] = b.name.split('-');
            const dateA = new Date(`01-${monthA}-${yearA}`);
            const dateB = new Date(`01-${monthB}-${yearB}`);
            return dateA - dateB;
        });
        setGraphData(convetedData)
    }

    useEffect(() => {
        if (allData.stockList) {
            categro(allData?.stockList);
        }
    }, [allData])

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
                <Line type="monotone" dataKey="SME" stroke="#82ca9d" />
                <Line type="monotone" dataKey="MainBoard" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>

    )
};

export default DashboardLineChart;