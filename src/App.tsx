import React from 'react';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Home from './pages/Home';
import NormalLayout from './layouts/NormalLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './adminPages/AdminDashboardPage';
import ChannelDetails from './adminPages/ChannelDetails';
import ProtectedRoute from './utils/ProtectedRoute';


const App: React.FC = () => {   

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) 

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NormalLayout />}>
                    <Route index element={<Home/>} />
                </Route>
                <Route path="admin" element={<AdminLayout/>}>
                    {/* <Route index element={<ProtectedRoute component={AdminDashboardPage} isAuthenticated={isAuthenticated} />}/> */}
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                    <Route path="dashboard" element={<AdminDashboardPage/>} />
                    <Route path="channel-details" element={<ChannelDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
} 

export default App;
