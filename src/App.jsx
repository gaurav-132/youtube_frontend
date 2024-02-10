import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

const App = () => {

    const [sidebar, setSidebar] = useState(true);
    const [isWide, setIsWide] = useState(false);
    return(
        <BrowserRouter>
            <Header/>
            {sidebar && <Sidebar isWide={isWide}/>}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/services' element={<Service/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
} 

export default App;
