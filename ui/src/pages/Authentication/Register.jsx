import { useEffect, useLayoutEffect, useState } from "react";
import style from './Authenstyles.module.css';
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Register() {
    const navigate = useNavigate();

    const [formInfo, setFormInfo] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormChange = (e) => {
        const { name, value} = e.target;

        setFormInfo(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formInfo.username || !formInfo.password){
            setErrorMessage('Please fill out all information!');
            return;
        };
        if (formInfo.password.length < 8){
            setErrorMessage('Password must have at least 8 characters');
            return;
        }

        try {
            const response = await fetch('http://localhost:3003/user/register', {
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

            if (response.ok) {
                console.log('sign up success');
                setIsSubmit(true);
            }

        } catch (error) {
            setErrorMessage(error);
        }
    };

    useLayoutEffect(() => {
        if (isSubmit) {
            navigate('/login');
        }
    }, [isSubmit]);

    useEffect(() => {
        console.log(formInfo);
    });

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>Register</div>
                    <form onSubmit={handleFormSubmit} className={cx('content-form')}>
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
                                type="text"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className={cx('error-message')}>{errorMessage}</div>

                        <div className={cx('form-button')}>
                            <button type="submit">Sign up</button>
                        </div>
            
                    </form>

                    <Link to='/login' className={cx('Link')}>To log in</Link>
                </div>
            </div>
        </>
    );
}

export default Register;