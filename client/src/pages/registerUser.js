import { useState } from "react";
import { onRegistrationUser } from "../api/auth";
import '../css/register.css'; // Import your CSS file

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Confirm submission with the user
    const confirmed = window.confirm('Are you sure you want to submit?');
    if (!confirmed) return;

    try {
      const { data } = await onRegistrationUser(values);
      setError('');
      setSuccess(data.message);
      setValues({ username: '', password: '' });
      localStorage.setItem('isAuth', 'true');
      window.location.reload();
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

  return (
    <div className="register-container">
      <div className="container mt-3">
        <h3 className="text-center">REGISTER</h3>
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
            <div className="input-group">
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
          {/* Display success message */}
          {success && <div className="success-message">{success}</div>}

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
