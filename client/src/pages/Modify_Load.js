import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from "react-hook-form"


const Modify_Load = () => {

const { register, handleSubmit } = useForm();
const [formState, setFormState] = useState({streetAddress: '', state: '' , zipcode: '' , donationItem: '', number: '' , trucker: '', currentStatus: '', confirmed: false, dateStart:'', timeStart: '', timeDuration: '' });
const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onSubmit = async(data2) => {
    console.log(data2.number, formState.streetAddress)


    try {
 console.log("trucking id is this:", data?.trucker_Id.truck,  "button value is:", button)
      await updateLoad({
        // variables: { ...data }
        variables: {
          streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: data2.number,  currentStatus: button, trucker: data?.trucker_Id.truck,  rating: data2.rating, confirmed: false, dateStart: data2.dateStart, timeStart: data2.timeStart, timeDuration: data2.timeDuration
        }
      })
    } catch (e) {
      console.error(e);
      let test = e
      console.log("testing error is:", error)
    }
        

    
  }

  return (
    <div className="container my-1">
    <h2>Add Load</h2>

    <form onSubmit = {handleSubmit(onSubmit)}></form>

    </div>

  )

}

export default Modify_Load;