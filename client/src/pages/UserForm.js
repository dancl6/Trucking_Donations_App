import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from "react-hook-form"
import { onError } from "apollo-link-error"
import { UPDATE_LOAD } from '../utils/mutations';
import { TRUCK_ID_IS, GET_LOAD } from '../utils/queries';
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import { useParams } from 'react-router-dom'
import { createHttpLink } from "apollo-link-http";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export function  UserForm({preloadedValues}) {
// const preloadedValues = {
    const { register, handleSubmit, formState: { errors }
} = useForm({
  defaultValues: preloadedValues
});
// }
// const QueryString = window.location.search;
// console.log("Query string is:", QueryString)
// const id = QueryString

const { id } = useParams();
const [updateLoad, {error}] = useMutation(UPDATE_LOAD)
const { loading: loadingLoad, data: loadData } = useQuery(GET_LOAD, {
  variables: { _id: id }
});
console.log("data from get load is this:", loadData.getLoad.dateStart)
const {data} = useQuery(TRUCK_ID_IS);
const [startDate, setStartDate] = useState(new Date());
const [formState, setFormState] = useState({streetAddress: loadData.getLoad.streetAddress, state: loadData.getLoad.state , zipcode: loadData.getLoad.zipcode , donationItem: loadData.getLoad.donationItem, number: parseInt(loadData.getLoad.number) , trucker: loadData.getLoad.trucker, currentStatus: loadData.getLoad.currentStatus, confirmed: JSON.parse(loadData.getLoad.confirmed), dateStart:loadData.getLoad.dateStart, timeStart: parseInt(loadData.getLoad.timeStart), timeDuration: parseInt(loadData.getLoad.timeDuration) });
const [button, setButton] = useState(loadData?.getLoad.currentStatus);
function parseISOString(s) {
  console.log("date is this:", loadData.getLoad.dateStart)
  var b = s.split(/\D+/);
  console.log("new date is this:",new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])) )
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
const onSubmit = async(data2) => {
  console.log("data 2 is on submit",data2, formState.streetAddress)
console.log("testing one two", data?.trucker_Id.truck)


  try {
//  console.log("trucking id is this:", data?.trucker_Id.truck,  "button value is:", button)
    await updateLoad({
      // variables: { ...data }
      variables: {
       LoadId: id, streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: parseInt(data2.number),  currentStatus: button, trucker: data?.trucker_Id.truck,  rating: parseInt(data2.rating), confirmed: JSON.parse(formState.confirmed), dateStart: formState.dateStart, timeStart: parseInt(data2.timeStart), timeDuration: parseInt(data2.timeDuration)
      }
    })
  } catch (e) {
    console.error(e);
    // let test = e
    console.log("testing error user form is:", error)
  }
      

  
}

const handleChangeDate2= (event,date) => {
  console.log("event  from date 2 is:", event.target)
  // const { name } = event.target;
  setFormState({
    ...formState,
  dateStart  : moment(date).format()
  });
};


// const [formState, setFormState] = useState({LoadId: "607f8255c8bb1c7408eba11e",streetAddress: "", state: "WHY NOW" , zipcode: null , donationItem: "", number: 45 , dock:"607f8204c8bb1c7408eba11d", trucker: "607f81e9c8bb1c7408eba11c", currentStatus: "", confirmed: true, dateStart:76, timeStart: 86, timeDuration: 35 });
const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  let test

  const requestLink = createHttpLink({
    uri: 'http//api.githunt.com/graphql',
  })
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
      
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
  
      );
      let test = graphQLErrors
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  
  const link = errorLink.concat(requestLink)
  
  
  console.log("link", link)
  

  


  
  return (
    <div className="container my-1">
      <Link to="/trucker_login">
        ← Go to Login
      </Link>

      <h2>Modify Load</h2>

      <form onSubmit = {handleSubmit(onSubmit)}
        
        

        >
        <div className="flex-row space-between my-2">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            ref = {register}
            placeholder="streetAddress"
            name="streetAddress"
            type="streetAddress"
            {...register("streetAddress", {required: true})}
            id="streetAddress"
            // value={formState.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="confirmed">Confirmed?:</label>
          <input
            ref = {register}
            placeholder="confirmed"
            name="confirmed"
            type="confirmed"
            {...register("confirmed", {required: true},
            {       
              setValueAs: v => 
                // let stringValue =  "true"
                 JSON.parse(v)
          
                
 
            })}
            id="confirmed"
            // value={formState.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="state">State:</label>
          <input
            ref = {register}
            placeholder="state"
            name="state"
            type="state"
            {...register("state", {required: true})}
            id="state"
            // value={formState.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            ref = {register}
            placeholder="zipcode"
            name="zipcode"
            type="zipcode"
            {...register("zipcode", {required: true})}
            id="zipcode"
            // value={formState.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="donationItem">Donation Item:</label>
          <input
            ref = {register}
            placeholder="Donation Item"
            name="donationItem"
            type="donationItem"
            {...register("donationItem", {required: true})}
            id="donationItem"
            // value={formState.donationItem}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="number">Number:</label>
          <input
            ref = {register}
          type = "number" 
          {...register(
                  "number",
                  {required: true},
                  {       
                    setValueAs: v => parseFloat(v)       
       
                  })} 
 

            onChange={handleChange}
            name = "number"
          />
            {errors.number ? <div>{errors.number.message}</div> : null}
            {test ? <div>{test}</div> : null}

        </div>

        <div>
          <div title = {button} onSelect = {function (evt) {
            setButton(evt)
          }}
          ref = {register}
          {...register("currentStatus", {required: true})}
          name = "currentStatus"
          type = "currentStatus"
          > 
          </div>
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="currentStatus">Current Status:</label>
          
          <DropdownButton title = {button} onSelect = {function (evt) {
            console.log("the new and nice value is:", evt)

             setButton(evt)
          }}
          ref = {register}
          {...register("currentStatus", {required: true})}
          name = "currentStatus"
          type = "currentStatus"
          > <MenuItem eventKey = "Open">Open</MenuItem>
              <MenuItem eventKey = "In Progress">In Progress</MenuItem>
              <MenuItem eventKey = "Closed">Closed</MenuItem>
          </DropdownButton>
        </div>

        <div className="flex-row space-between my-2">
        <label htmlFor="dateStart">Start Date for Load Drop Off:</label>
        <DatePicker  
              ref = {register}
              {...register("dateStart", {required: true})}
              name="dateStart"
              type="dateStart"
              id="dateStart"
              key = "dateStart"
              selected={parseISOString(loadData.getLoad.dateStart)}
              onChange={(date) => {
                // setStartDate(date)
                // console.log("value for datepicker is:", value)
                handleChangeDate2(date)
              }}
              // onChange =   {handleChange}

              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
        
 
        
        />

          {/* <input 
            ref = {register}
          type = "dateStart" 
          {...register(
                  "dateStart",
                  {required: true},

                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            name = "dateStart"
          /> */}

            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="timeStart">Start Time for Load Drop Off:</label>
          <input 
          type = "timeStart" 
          ref = {register}
          {...register(
                  "timeStart",
                  {required: true},
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            name = "timeStart"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="timeStart">Start Time for Load Drop Off:</label>
          <input 
          type = "number" 
          {...register(
                  "timeStart",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "timeStart"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="dateEnd">End Date for Load Drop Off:</label>
          <input 
          type = "number" 
          {...register(
                  "dateEnd",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "dateEnd"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="timeEnd">End Time for Load Drop Off:</label>
          <input 
          type = "number" 
          {...register(
                  "timeEnd",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "timeEnd"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>

        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>

  )

}

// export default UserForm;