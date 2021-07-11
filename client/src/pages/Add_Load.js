import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
// import Auth from "../utils/auth";
import { ADD_LOAD } from "../utils/mutations";
import { useForm } from "react-hook-form"
// import { useAsyncTask } from 'react-hooks-async'

// function Trucker_Signup() {
const Load_Added = () => {
  const [formState, setFormState] = useState({streetAddress: '', state: '' , zipcode: '' , donationItem: '', number: '' , trucker: '', currentStatus: '',comments:'', dock: '', rating: '' });
  const [addLoad, { error }] = useMutation(ADD_LOAD);
  const { register, handleSubmit, errors
} = useForm();
  // const cancelForm = async event => {
  //   document.getElementById("trucker").reset();
  // }

  const onSubmit = data => {
    console.log(data)
  }

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
       await addLoad({
        variables: { ...formState }
        // variables: {
        //   streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: formState.number, trucker: formState.trucker, currentStatus: formState.currentStatus, dock: formState.dock
        // }
      });
      
      // Auth.login(data.token);
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
      <Link to="/trucker_login">
        ← Go to Login
      </Link>

      <h2>Add Load</h2>
      {/* <form onSubmit=   {handleSubmit(onSubmit)}> */}
      <form onSubmit = {handleSubmit(async(formData) => {
          // const response =     
             await addLoad({
            variables: { ...formData }
            // variables: {
            //   streetAddress: formData.streetAddress, state: formData.state, zipcode: formData.zipcode, donationItem: formData.donationItem, number: formData.number, trucker: formData.trucker, currentStatus: formData.currentStatus, dock: formData.dock
            // }
          });
          // const data = await response.json();
          // console.log(data, "server data")
        })}>
        <div className="flex-row space-between my-2">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            placeholder="streetAddress"
            name="streetAddress"
            type="streetAddress"
            id="streetAddress"
            value={formState.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="state">State:</label>
          <input
            placeholder="state"
            name="state"
            type="state"
            id="state"
            value={formState.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            placeholder="zipcode"
            name="zipcode"
            type="zipcode"
            id="zipcode"
            value={formState.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="donationItem">Donation Item:</label>
          <input
            placeholder="Donation Item"
            name="donationItem"
            type="donationItem"
            id="donationItem"
            value={formState.donationItem}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="number">Number:</label>
          <input
          type = "number" 
          {...register(
                  "number",
                  {       
                    setValueAs: v => parseInt(v)       
       
                  })} 
            // placeholder="number"
            // name="number"
            // type="number"
            // id="number"
            // ref={
            //   register({
            //     validate: v =>
            //     typeof v !== "number" ? "Invalid amount" : v % 2 !==0 ? "Only even amounts are allowed!" : undefined,
            //   })
            // }

            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="trucker">Trucker:</label>
          <input
            placeholder="trucker"
            name="trucker"
            type="trucker"
            id="trucker"
            value={formState.trucker}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="currentStatus">Current Status:</label>
          <input
            placeholder="currentStatus"
            name="currentStatus"
            type="currentStatus"
            id="currentStatus"
            value={formState.currentStatus}
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="dock">Dock:</label>
          <input
            placeholder="dock"
            name="dock"
            type="dock"
            id="dock"
            value={formState.dock}
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
        <label htmlFor="rating">Rating:</label>
          <input 
          type = "rating" 
          {...register(
                  "rating",
                  {       
                    setValueAs: v => parseFloat(v)       
       
                  })} 
            // placeholder="number"
            // name="number"
            // type="number"
            // id="number"
            // ref={
            //   register({
            //     validate: v =>
            //     typeof v !== "number" ? "Invalid amount" : v % 2 !==0 ? "Only even amounts are allowed!" : undefined,
            //   })
            // }

            onChange={handleChange}
          />
        </div>

        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

}

export default Load_Added;
