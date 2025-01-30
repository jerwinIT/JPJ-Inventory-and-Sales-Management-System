import { useState } from "react";
import Layout from "../components/layout";
import { onLogin } from "../api/auth";
import { useDispatch } from 'react-redux';
import { authenticateUser } from "../redux/slices/authSlice";
import '../css/login.css'; 

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
    setError(''); // Clear any previous errors when input changes
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());
      localStorage.setItem('isAuth', 'true');
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="login-container"> 
          <h1>USER</h1> 
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Username field */}
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                onChange={(e) => onChange(e)}
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={values.username}
                placeholder='Enter your username'
                required
              />
            </div>
            {/* Password Field */}
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <div className='input-group'>
                <input
                  onChange={(e) => onChange(e)}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  className='form-control'
                  id='password'
                  name='password'
                  placeholder='Enter your password'
                  required
                />
                <button
                  className='btn btn-outline-secondary' // Removed 'text-white' class
                  style={{ color: 'white', backgroundColor: 'black' }} // Added inline style to set button color
                  type='button'
                  onClick={togglePasswordVisibility}
                >
                  <span style={{ color: 'white' }}>{showPassword ? 'Hide' : 'Show'}</span>
                </button>

              </div>
            </div>

            {/* Display error message */}
            {error && <div className="error-message">{error}</div>}

            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
