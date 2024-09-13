import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NewBar from './NewBar';
import IpoEntry from './IpoEntry';
import IpoList from './IpoList';
import StockDetails from './StockDetails';
import StockDetailList from './StockDetailList';
import LoneList from './LoneList';
import LoneForm from './LoneForm';
import Dashboard from './Dashboard';
import AccountDetail from './AccountDetail';

function MainRaouter() {

    return (
        <div>
            <BrowserRouter>
                <NewBar />
                <Routes>
                    <Route path='/*' element={
                        <Routes>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/ipo-entry' element={<IpoEntry />} />
                            <Route path='/ipo-list' element={<IpoList />} />
                            <Route path='/stock-details' element={<StockDetails />} />
                            {/* for edit */}
                            <Route path='/stock-details/:id' element={<StockDetails />} />
                            <Route path='/stock-details-list' element={<StockDetailList />} />
                            <Route path='/lone-list' element={<LoneList />} />
                            <Route path='/lone-form' element={<LoneForm />} />
                            <Route path='/lone-form/:id' element={<LoneForm />} />
                            <Route path='/account-detail' element={<AccountDetail />} />
                        </Routes>
                    } />
                    <Route path='/' element={<Navigate replace to="/dashboard" />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainRaouter