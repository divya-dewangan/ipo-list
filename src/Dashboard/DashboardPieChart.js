import React, { useEffect, useState } from 'react';
import { Cell, Line, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getRandomColor, graphColors } from './Constant';
import { Card, Form } from 'react-bootstrap';

function MyLineChart({ allData, status, type, title }) {

    const [graphData, setGraphData] = useState([]);

    const [selectedType, setSelectedType] = useState('Main Board');

    const handleSelectChange = (event) => {
        setSelectedType(event.target.value);
        countByNameAndStatus(allData?.data, status, event.target.value);
    };

    function countByNameAndStatus(data, status, type) {
        // Filter items by the given status
        const filtered = data?.filter(item => item?.status === status && item?.type === type);

        // Create a map to store counts of each name
        const nameCounts = filtered?.reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + 1;
            return acc;
        }, {});


        // Convert the map to the desired output format
        const mainData = Object.keys(nameCounts)?.map(name => ({
            name: name,
            value: nameCounts[name],

        }));
        setGraphData(mainData);
    }

    useEffect(() => {
        if (allData.data) {
            countByNameAndStatus(allData?.data, status, selectedType);
        }
    }, [allData])

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" fontSize={14} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {value}
            </text>
        );
    };

    return (
        <Card>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{title}</span>
                <Form.Select aria-label="Select Type" style={{ width: '140px' }} value={selectedType} onChange={handleSelectChange}>
                    <option value="Main Board">Main Board</option>
                    <option value="SME">SME</option>
                </Form.Select>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center align-items-center">
                <ResponsiveContainer width={200} height={260}>
                    <PieChart >
                        <Pie
                            data={graphData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            innerRadius={50}
                            dataKey="value"
                            animationDuration={500} // Customize the animation duration (in ms)
                            animationEasing="ease-in-out" // Customize easing  // ease //linear
                            legendType='line'
                        >
                            <Line type="monotone" dataKey="SME" stroke="#82ca9d" />
                            {graphData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={graphColors[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    );
}

export default MyLineChart;
