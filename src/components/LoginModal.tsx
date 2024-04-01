import { useState } from 'react';
import { BACKEND_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { closeLoginModal } from '../features/adminSlice';
import { login } from '../features/authSlice';


interface FormData {
    email: string;
    password: string;
}

const LoginModal: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeLoginModal());
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const URI: string = `${BACKEND_URL}/api/v1/users/login`;

    const HEADER_OBJ = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(URI, HEADER_OBJ);
            const resData = await response.json();
            const { data } = resData;

            dispatch(login({user: data.user}));

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className='fixed top-0 w-full z-50 h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='modal-bg w-[45%] h-[85%] rounded-lg' onClick={handleModalClick}>
                <div className='flex justify-between w-auto mx-6 mt-4'>
                    <div className='text-xl text-center font-semibold mb-4'>Login or Signup</div>
                    <div className=''>
                        <button className='text-gray-500 hover:text-white focus:outline-none' onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit} className='space-y-4 m-6 my-4'>
                    <div>
                        <label htmlFor='email' className='block mb-1'>Email :</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-full text-black border border-gray-400 rounded-md px-3 py-1'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block mb-1'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            className='w-full text-black border border-gray-400 rounded-md px-3 py-1'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
