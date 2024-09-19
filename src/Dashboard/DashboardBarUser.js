import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush, AreaChart, Area, BarChart, Bar } from "recharts";
import DashboardBar from "./DashboardBar";
import { Card, Form } from "react-bootstrap";
import { graphColors } from "./Constant";



const DashboardBarUserChart = ({ allData }) => {

    const [graphData, setGraphData] = useState([])
    const [userList, setUserList] = useState([])

    const [selectedType, setSelectedType] = useState('Main Board');

    const handleSelectChange = (event) => {
        setSelectedType(event.target.value);
        processData(allData?.data, event.target.value);
    };


    // Function to format date as "MMM-YY"
    const formatMonthYear = (dateString) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
        return `${month}-${year}`;
    };

    // Function to generate the last six months dynamically
    const getLastSixMonths = () => {
        const today = new Date();
        const months = [];

        for (let i = 3; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1); // Go back by 'i' months
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
            months.push(`${month}-${year}`);
        }

        return months;
    };

    // Function to process data for month and user-wise count using lastdate and filter by type
    const processData = (data, selectedType) => {
        // Generate the last six months dynamically
        const monthRange = getLastSixMonths();

        // Filter the data based on the selected type (Main Board or SME)
        const filteredData = data.filter(item => item.type === selectedType);

        // Extract all unique user names
        const userNames = [...new Set(filteredData.map(item => item.name))];

        // Initialize the result array with month names and user counts
        const monthlyData = monthRange.map((month) => {
            const result = { name: month }; // Month key
            userNames.forEach(user => {
                result[user] = 0; // Initialize user count as 0 for each user
            });
            return result;
        });

        // Populate the data with actual counts for each user per month
        filteredData.forEach(item => {
            const monthYear = formatMonthYear(item.lastdate);  // Use lastdate instead of createdDate
            const userName = item.name; // Get the user's name

            const monthData = monthlyData.find(entry => entry.name === monthYear);
            if (monthData) {
                monthData[userName] += 1; // Increment user count for that month and user
            }
        });

        setGraphData(monthlyData)
    };


    useEffect(() => {
        if (allData.data) {
            processData(allData?.data, selectedType);
            setUserList(allData?.userName)
        }
    }, [allData])



    return (
        <Card>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Month wise User IPO Applied</span>
                <Form.Select aria-label="Select Type" style={{ width: '200px' }} value={selectedType} onChange={handleSelectChange}>
                    <option value="Main Board">Main Board</option>
                    <option value="SME">SME</option>
                </Form.Select>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center align-items-center">
                <ResponsiveContainer height={400}>
                    <BarChart data={graphData}>
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
                        {/* Each Bar represents a different user */}
                        {userList?.map((item, index) => (<Bar key={index} dataKey={item?.value} fill={graphColors[index]} />))}

                    </BarChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>

    )
};

export default DashboardBarUserChart;