import { useState } from 'react';
import { BACKEND_URL } from '../../../utils/constant';
import { useDispatch } from 'react-redux';
import { closeLoginModal } from '../../admin/store/adminSlice';
import { login } from '../store/authSlice';

interface FormData {
    email: string;
    password: string;
}

const LoginModal: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeLoginModal());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const resData = await response.json();
            const { data } = resData;

            dispatch(login({ user: data.user }));
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            dispatch(closeLoginModal());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-3 sm:p-6"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-[420px] bg-[#212121] border border-[#3a3a3a] rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-[#333]">
                    <h2 className="text-white text-lg font-semibold">Sign in</h2>
                    <button className="text-gray-400 hover:text-white" onClick={handleClose} aria-label="Close login modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1.5 text-sm text-gray-200">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-[#121212] text-white border border-[#444] rounded-lg px-3 py-2.5 focus:border-[#3ea6ff] outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1.5 text-sm text-gray-200">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full bg-[#121212] text-white border border-[#444] rounded-lg px-3 py-2.5 focus:border-[#3ea6ff] outline-none"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-[#3ea6ff] text-[#0f0f0f] py-2.5 rounded-full font-semibold hover:brightness-110 transition-all">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
