import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_DOCK } from '../utils/mutations';
import Auth from '../utils/auth';

const Dock_Login = (props) => {
  const [formState, setFormState] = useState({ name: '', password: '' });
  const [dockLogin, { error }] = useMutation(LOGIN_DOCK);
  // update state based on form input changes

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

// submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await dockLogin({
        variables: { ...formState }
      });
    console.log("new data is :", data)
      Auth.login(data.dockLogin.token);
    } catch (e) {
      console.error(e);
    }
  };



  

  return (
    <main className='flex-row justify-center mb-4 d-flex justify-content-center see_through'>
      <div className='col-12 col-md-6 '>
        <div className='card'>
          <h4 className='card-header center_text'>Dock Login</h4>
          <div className='card-body center_text'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input mb-1 center_text'
                placeholder='Username'
                name='name'
                type='name'
                id='name'
                value={formState.name}
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

export default Dock_Login;