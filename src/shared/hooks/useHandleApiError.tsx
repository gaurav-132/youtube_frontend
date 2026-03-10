import { useDispatch } from 'react-redux';
import { openLoginModal } from '../../features/admin/store/adminSlice';
import { logout } from '../../features/auth/store/authSlice';

interface ErrorResponse {
    status?: number;
    message: string;
}

export const useHandleApiError = () => {
    const dispatch = useDispatch();

    const handleApiError = (error: any) => {
        console.log("Received error:", error);

        try {
            const errorResponse: ErrorResponse = typeof error === 'string' ? JSON.parse(error) : error;

            if (errorResponse.status === 401 && ["TokenExpired", "Invalid Access Token!"].includes(errorResponse.message)) {
                dispatch(logout());
                dispatch(openLoginModal());
            } else {
                console.error("Unhandled API error:", errorResponse);
            }
        } catch (parseError) {
            console.error("Failed to parse error response:", parseError);
            console.error("Original error:", error);
        }
    };

    return handleApiError;
};
