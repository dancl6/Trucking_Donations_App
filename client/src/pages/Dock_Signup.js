import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_DOCK_USER } from "../utils/mutations";

// function Trucker_Signup() {
const Dock_Signup = () => {
  const [formState, setFormState] = useState({ name: '', streetAddress: '', state: '' , zipcode: '' , password: '' , phoneNumber: '' });
  const [addUser, { error }] = useMutation(ADD_DOCK_USER);



  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });
      
      Auth.login(data.token);
    } catch (e) {
      console.error(e);
    }
    console.log(error)
  }
  
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };


  return (
    <div className="container my-1">
      {/* <Link to="/trucker_login">
        ← Go to Login
      </Link> */}

      <h2 className =" center_text">Dock Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2 center_text">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 center_text">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            placeholder="Street Address"
            name="streetAddress"
            type="streetAddress"
            id="streetAddress"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 center_text">
          <label htmlFor="state">State:</label>
          <input
            placeholder="youremail@test.com"
            name="state"
            type="state"
            id="state"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 center_text">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            placeholder="******"
            name="zipcode"
            type="zipcode"
            id="zipcode"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 center_text">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 center_text">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            placeholder="******"
            name="phoneNumber"
            type="phoneNumber"
            id="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end center_text">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

}

export default Dock_Signup;
