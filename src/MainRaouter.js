import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NewBar from './NewBar';
import IpoEntry from './IpoEntry';
import IpoList from './IpoList';
import StockDetails from './StockDetails';
import StockDetailList from './StockDetailList';
import LoneList from './LoneList';
import LoneForm from './LoneForm';

function MainRaouter() {

    return (
        <div>
            <BrowserRouter>
                <NewBar />
                <Routes>
                    <Route path='/*' element={
                        <Routes>
                            <Route path='/ipo-entry' element={<IpoEntry />} />
                            <Route path='/ipo-list' element={<IpoList />} />
                            <Route path='/stock-details' element={<StockDetails />} />
                            <Route path='/stock-details-list' element={<StockDetailList />} />
                            <Route path='/lone-list' element={<LoneList />} />
                            <Route path='/lone-form' element={<LoneForm />} />
                        </Routes>
                    } />
                    <Route path='/' element={<Navigate replace to="/ipo-entry" />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainRaouter