import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import className from 'classnames/bind';
import style from './Authenstyles.module.css';
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const cx = className.bind(style);

function Login() {
    const navigate = useNavigate();

    const [formInfo, setFormInfo] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formInfo.username || !formInfo.password){
            setErrorMessage('Please fill out all information!');
            return;
        }

        console.log(formInfo);
        
        try {
            const response = await fetch('http://localhost:3003/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formInfo.username,
                    password: formInfo.password,
                }),
            });

            if (response.ok){
                setIsSubmit(true);
            }
        } catch (error) {
            setErrorMessage(error);
        }
    };

    const handlePasswordShow = () => {
        setIsPasswordShow(prev => !prev);
    };

    useLayoutEffect(() => {
        if (isSubmit) {
            navigate('/');
        }
    }, [isSubmit]);


    useEffect(() => {
        console.log('30cm');
    });

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>Login</div>
                    <form onSubmit={handleSubmit} className={cx('content-form')}>
                        <div className={cx('input-container')}>
                            <label htmlFor="username" className={cx('input-label')}>Username:</label>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className={cx('input-container')}>
                            <label htmlFor="password" className={cx('input-label')}>Password:</label>
                            <input 
                                type={isPasswordShow ? "text" : "password"} 
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleFormChange}
                            />
                            <FaEye className={cx('input-icon')} onClick={handlePasswordShow}/>
                        </div>

                        <div className={cx('error-message')}>{errorMessage}</div>
        
                        <div className={cx('form-button')}>
                            <button type="submit">Log in</button>
                        </div>

                    </form>
                    <Link to='/register' className={cx('Link')}>Create account</Link>
                </div>
            </div>
        </>
    );
}

export default Login;