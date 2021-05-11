import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_TRUCKER } from '../utils/mutations';
import Auth from '../utils/auth';

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
    
      Auth.login(data.token);
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
          <h4 className='card-header'>Trucker Login</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input mb-1'
                placeholder='Username'
                name='userName'
                type='userName'
                id='userName'
                value={formState.userName}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Trucker_Login;