import React, { useState } from 'react';
import './SignUpPage.css'; // Import your CSS file for styling
import { FaGoogle, FaFacebookF, FaApple, FaLinkedin } from 'react-icons/fa';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordStrengthText, setPasswordStrengthText] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [otpVisible, setOtpVisible] = useState(false);
    const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
    const [isSignUp, setIsSignUp] = useState(false);

    // Handle password visibility toggle
    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Handle password strength calculation
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        let strength = 0;
        let message = '';

        if (newPassword.length >= 8) strength += 25;
        if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) strength += 25;
        if (/\d/.test(newPassword)) strength += 25;
        if (/[^a-zA-Z\d]/.test(newPassword)) strength += 25;

        setPasswordStrength(strength);

        if (strength <= 25) message = 'Weak';
        else if (strength <= 50) message = 'Fair';
        else if (strength <= 75) message = 'Good';
        else message = 'Strong';

        setPasswordStrengthText(message);
    };

    // Handle OTP input
    const handleOtpChange = (e, index) => {
        const newOtpInputs = [...otpInputs];
        newOtpInputs[index] = e.target.value;
        setOtpInputs(newOtpInputs);

        // Move to the next input if current one is filled
        if (e.target.value && index < 3) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    // Resend OTP
    const resendOTP = () => {
        setSuccessMessage('New OTP has been sent to your email');
        setOtpInputs(['', '', '', '']);
        document.getElementById('otp-input-0').focus();
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        // Validate password
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage('Authentication successful! Sending OTP...');
            setOtpVisible(true);
        }, 2000);
    };

    // Handle social sign-ins
    const socialSignIn = (provider) => {
        const providers = {
            google: { color: '#ea4335', icon: <FaGoogle /> },
            facebook: { color: '#1877f2', icon: <FaFacebookF /> },
            apple: { color: '#000000', icon: <FaApple /> },
            linkedin: { color: '#0077b5', icon: <FaLinkedin /> },
        };

        setSuccessMessage(`Redirecting to ${provider} login...`);
    };

    // Toggle between sign in and sign up
    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setEmail('');
        setPassword('');
        setPasswordStrength(0);
        setPasswordStrengthText('');
        setOtpVisible(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div className="auth-container mx-auto mt-5 mb-5">
            <div className="auth-sidebar">
                <div>
                    <h2>Welcome Back!</h2>
                    <p>Access your account and manage your portfolio with our secure authentication system.</p>
                </div>
                
            </div>

            <div className="auth-main">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                        <p>Continue with your preferred method</p>
                    </div>

                    <div className="social-buttons">
                        <button type="button" className="social-button" onClick={() => socialSignIn('google')}>
                            <FaGoogle />
                        </button>
                        <button type="button" className="social-button" onClick={() => socialSignIn('facebook')}>
                            <FaFacebookF />
                        </button>
                        <button type="button" className="social-button" onClick={() => socialSignIn('linkedin')}>
                            <FaLinkedin />
                        </button>
                    </div>

                    <div className="divider">or</div>

                    <div className="form-group">
                        <i className="fas fa-envelope input-icon"></i>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Student Id / Staff Id" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-lock input-icon"></i>
                        <input 
                            type={isPasswordVisible ? 'text' : 'password'}
                            className="form-control" 
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password" 
                            required 
                        />
                        <i 
                            className={`far ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} password-toggle`} 
                            onClick={handlePasswordToggle} 
                        />
                        <div className="password-strength">
                            <div className="password-strength-bar" style={{ width: `${passwordStrength}%` }}></div>
                        </div>
                        <div className="strength-text">{`Password Strength: ${passwordStrengthText}`}</div>
                    </div>

                    <div className="checkbox-container" onClick={() => setRememberMe(!rememberMe)}>
                        <div className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}>
                            {rememberMe && <i className="fas fa-check"></i>}
                        </div>
                        <label>Remember me</label>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn" 
                        disabled={isSubmitting}
                    >
                        <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                        {isSubmitting && <div className="loader"><i className="fas fa-spinner fa-spin"></i></div>}
                    </button>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    {otpVisible && (
                        <div className="otp-container">
                            <p>Enter the verification code sent to your email</p>
                            <div className="otp-inputs">
                                {otpInputs.map((otp, index) => (
                                    <input 
                                        key={index}
                                        type="text" 
                                        maxLength="1" 
                                        value={otp}
                                        id={`otp-input-${index}`} 
                                        onChange={(e) => handleOtpChange(e, index)} 
                                    />
                                ))}
                            </div>
                            <p>Didn't receive the code? <a href="#" onClick={resendOTP}>Resend</a></p>
                        </div>
                    )}

                    <div className="terms">
                        By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </div>

                    <div className="switch-form">
                        {isSignUp ? (
                            <>
                                Already have an account? <a href="#" onClick={toggleForm}>Sign In</a>
                            </>
                        ) : (
                            <>
                                Don't have an account? <a href="#" onClick={toggleForm}>Sign Up</a>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
