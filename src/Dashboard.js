import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import DashboardPieChartHalf from './Dashboard/DashboardPieChartHalf'
import MyLineChart from './Dashboard/DashboardPieChart'
import { toast } from 'react-toastify'
import DashboardPie from './Dashboard/DashboardPie'
import DashboardBar from './Dashboard/DashboardBar'
import DashboardStacked from './Dashboard/DashboardStacked'
import { graphColors } from './Dashboard/Constant'
import DashboardLineChart from './Dashboard/DashboardLineChart'
import DashboardBarUserChart from './Dashboard/DashboardBarUser'
import Loader from './Loader'

function Dashboard() {
    const [allData, setAllData] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getInitialData();
    }, [])

    const getInitialData = () => {
        setLoading(true)
        fetch("https://ipo-list-1112-default-rtdb.firebaseio.com/ipo-list.json")
            .then((data) => data.json())
            .then((res) => {
                console.log("Account Backup::", res)
                const allData = { ...res };
                const checkNullArray = allData?.data?.filter(item => item !== null)
                const modifyColor = checkNullArray?.map((item, index) => ({ ...item, color: graphColors[index] }));
                const checkNullArrayForstockList = allData?.stockList?.filter(item => item !== null)
                res.data = modifyColor
                res.stockList = checkNullArrayForstockList
                setAllData(res)
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error)
                setLoading(false)
            })
    }
    return (
        <>
            <Loader show={loading} />
            <Container className='my-4'>

                <Row>
                    <Col md={4} className='mt-4'>
                        <MyLineChart allData={allData} status={1} title="Allocated IPO" />
                    </Col>
                    <Col md={4} className='mt-4'>
                        <MyLineChart allData={allData} status={2} title="Non-Allocated IPO" />
                    </Col>
                    <Col md={4} className='mt-4'>
                        <DashboardPie allData={allData} />
                    </Col>
                    <Col md={4} className='mt-4'>
                        <Card>
                            <Card.Header>Main Board Vs SME IPO </Card.Header>
                            <Card.Body className="d-flex justify-content-center align-items-center">
                                <DashboardPieChartHalf allData={allData} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8} className='mt-4'>
                        <Card>
                            <Card.Header>Hold Amount from the Start to Present</Card.Header>
                            <Card.Body className="d-flex justify-content-center align-items-center">
                                <DashboardBar allData={allData} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} className='mt-4'>
                                <DashboardLineChart allData={allData} />
                    </Col>



                    <Col md={12} className='mt-4'>
                        <Card>
                            <Card.Header>Cut off Price Chart </Card.Header>
                            <Card.Body className="d-flex justify-content-center align-items-center">
                                <DashboardStacked allData={allData} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={12} className='mt-4'>
                        <DashboardBarUserChart allData={allData} />
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default Dashboard