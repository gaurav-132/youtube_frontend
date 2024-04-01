import { useDispatch } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { openLoginModal } from '../features/adminSlice';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated}) => {

    const dispatch = useDispatch();


    if(!isAuthenticated) {
        dispatch(openLoginModal());
        return <Navigate to="/" />;
    }

    return <Route element={<Component />} />;
};

export default ProtectedRoute;
