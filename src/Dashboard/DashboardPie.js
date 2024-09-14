import React, { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { getRandomColor, graphColors } from './Constant'
import { Card, Form } from 'react-bootstrap'

function DashboardPie({ allData }) {
    const [graphData, setGraphData] = useState([])


    const [selectedType, setSelectedType] = useState('totalBalance');

    const handleSelectChange = (event) => {
        if (event.target.value) {

            setSelectedType(event.target.value);
            if (event.target.value === "totalBalance") {
                return countByNameAndStatus(allData?.userName, event.target.value);
            } else if (event.target.value === "holdBalance") {
                return countByNameAndStatus(allData.data, event.target.value)
            } else if (event.target.value === "leftBalance") {
                return countByNameAndStatus(allData, event.target.value)
            }
        }
    };

    const countByNameAndStatus = (data, type) => {

        let nameCounts = {}
        //for second table 
        if (type === 'leftBalance') {
            const initialValues = data?.userName?.reduce((acc, item) => {
                acc[item?.key] = item?.balance
                return acc;
            }, {});

            nameCounts = data?.data?.reduce((acc, item) => {
                if (!acc[item.name]) {
                    acc[item.name] = 0;
                }
                if (item.status === 0) {
                    acc[item.name] = (initialValues[item?.name] || 0) - (Number(item?.holdamount) || 0);
                }
                return acc;
            }, {});

            // check all zero condition
            const totalValue = Object.values(nameCounts).every(value => value === 0);
            if (totalValue) {
                nameCounts = initialValues
            }
        } else {
            nameCounts = data?.reduce((acc, item) => {
                if (type === 'totalBalance') {
                    acc[item?.key] = (acc[item?.key] || 0) + Number(item?.balance);
                } else {
                    if (!acc[item.name]) {
                        acc[item.name] = 0;
                    }
                    if (item.status === 0) {
                        acc[item.name] = (acc[item?.name] || 0) + Number(item?.holdamount);
                    }
                }
                return acc;
            }, {});
        }

        // Convert the map to the desired output format
        const mainData = Object.keys(nameCounts)?.map(name => ({
            name: name,
            value: nameCounts[name],

        }));
        const modifyColor = mainData?.map((item) => ({ ...item, fill: getRandomColor() }))
        setGraphData(modifyColor);
    }

    useEffect(() => {
        if (Object.keys(allData)?.length) {
            if (selectedType === "totalBalance") {
                countByNameAndStatus(allData?.userName, selectedType);
            } else if (selectedType === "holdBalance") {
                countByNameAndStatus(allData.data, selectedType)
            } else if (selectedType === "leftBalance") {
                countByNameAndStatus(allData, selectedType)
            }
        }
    }, [allData])

    return (
        <Card>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>User Balance Detail</span>
                <Form.Select aria-label="Select Type" style={{ width: '160px' }} value={selectedType} onChange={handleSelectChange}>
                    <option value="totalBalance">Total Balance</option>
                    <option value="holdBalance">Hold Balance</option>
                    <option value="leftBalance">Left Balance</option>
                </Form.Select>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center align-items-center">
                <PieChart width={400} height={260}>
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
            </Card.Body>
        </Card>
    )
}

export default DashboardPie