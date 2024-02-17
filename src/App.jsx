import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import NormalLayout from './layouts/NormalLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './adminPages/AdminDashboardPage';


const App = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NormalLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/services' element={<Service/>} />
                    <Route path='/contact' element={<Contact/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/login' element={<Login/>} />
                </Route>
                <Route path="admin/*" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    {/* <Route path="/manage-users" element={<AdminManageUsersPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
} 

export default App;
