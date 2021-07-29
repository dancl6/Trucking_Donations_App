import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_TRUCKER } from '../utils/mutations';
import Auth_Trucking from '../utils/auth';

const Trucker_Login = (props) => {
  const [formState, setFormState] = useState({ userName: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_TRUCKER);
  // update state based on form input changes

// submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });
    
      Auth_Trucking.login(data.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  

  return (
    <main className='flex-row justify-center mb-4 d-flex justify-content-center'>
      <div className='col-12 col-md-6 '>
        <div className='card'>
          <h4 className='card-header center_text'>Trucker Login</h4>
          <div className='card-body center_text'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input mb-1 center_text'
                placeholder='Username'
                name='userName'
                type='userName'
                id='userName'
                value={formState.userName}
                onChange={handleChange}
              />
              <input
                className='form-input center_text'
                placeholder='Password'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <div className="flex-row flex-end center_text">
              <button  type='submit'>
                Submit
              </button>
              </div>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Trucker_Login;