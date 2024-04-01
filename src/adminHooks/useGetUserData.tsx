import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constant";

export interface UserData {
    id: string;
    username: string;
}

const useGetUserData = (): UserData | null => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) { 
                const accessToken = localStorage.getItem("accessToken");   
                return;
            }   

            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/users/get-user-info`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    // Handle HTTP error
                    console.error('Failed to fetch user data:', response.statusText);
                    return;
                }

                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                // Handle other errors
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return userData;
};

export default useGetUserData;
