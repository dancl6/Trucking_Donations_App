import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from "react-hook-form"
import { onError } from "apollo-link-error"
import { UPDATE_LOAD } from '../utils/mutations';
import { TRUCK_ID_IS, GET_LOAD, QUERY_ME } from '../utils/queries';
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import { useParams } from 'react-router-dom'
import { createHttpLink } from "apollo-link-http";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Auth  from "../utils/auth";

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
const {data: data2} = useQuery(QUERY_ME);
const { id } = useParams();
const [updateLoad, {error}] = useMutation(UPDATE_LOAD)
const { loading: loadingLoad, data: loadData } = useQuery(GET_LOAD, {
  variables: { _id: id }
});
console.log("data from get load is this:", loadData.getLoad.dateStart)
const {data} = useQuery(TRUCK_ID_IS);
const [startDate, setStartDate] = useState(new Date(loadData.getLoad.dateStart));
// const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date(loadData.getLoad.dateEnd));
const [holdStartDate, setHoldStartDate] = useState()
const [holdEndDate, setHoldEndDate] = useState()
const [defaultRating, setDefaultRating] = useState()

const [thumbsUp, setThumbsUp] = useState(defaultRating)
console.log("ending date is:", loadData.getLoad.dateEnd)
console.log("starting date is:", loadData.getLoad.dateStart)
// setStartDate(
//  dateStart: loadData.getLoad.dateStart
// )
// setStartDate({
//   ...startDate,
//   month:moment(date).month(),
//   day: moment(date).date(),
//   hour: moment(date).hour(),
//   minute: moment(date).minute(),
//   year: moment(date).year()
// })


useEffect(() => {
  // console.log("starting date now is:", loadData.getLoad.dateStart.year)
  // startDate = new Date()

  setStartDate(
    new Date(loadData.getLoad.dateStart)
  )
  setEndDate(
    new Date(loadData.getLoad.dateEnd)
  )

    console.log("the load data get load rating is:", loadData.getLoad)
  

  if(loadData.getLoad.rating_dock === true || loadData.getLoad.rating_dock === false){
    setDefaultRating(loadData.getLoad.rating_dock)
  } else if(loadData.getLoad.rating_dock === null) {
    setDefaultRating()
  }
  console.log("thumbs in use effect is:", thumbsUp)
  // console.log("start date now is:", startDate.getHours())
  // test1.setFullYear(1000)
  // test1.setHours(11)
  // console.log("test full year is:", test1.getFullYear())
 
  // console.log("start date after setting is:", startDate.getFullYear())
},[loadData])

const [formState, setFormState] = useState({streetAddress: loadData.getLoad.streetAddress, state: loadData.getLoad.state , zipcode: loadData.getLoad.zipcode , donationItem: loadData.getLoad.donationItem, number: parseInt(loadData.getLoad.number) , trucker: loadData.getLoad.trucker, currentStatus: loadData.getLoad.currentStatus, confirmed: JSON.parse(loadData.getLoad.confirmed), dateStart:loadData.getLoad.dateStart, dateEnd:loadData.getLoad.dateEnd});
const [button, setButton] = useState(loadData?.getLoad.currentStatus);
const [button2, setButton2] = useState(loadData?.getLoad.rating_dock)
console.log("trucking trucker is:", loadData.getLoad.trucker._id)

function parseISOString(s) {
  return moment(s).format('MMMM d, YYYY h:mm a')
  // console.log("date is this:", loadData.getLoad.dateStart)
  // var b = s.split(/\D+/);
  // console.log("new date is this:",new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])) )
  // return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
const testConsole = () => {
  console.log("testing console")
}
const onSubmit = async(data2) => {
  console.log("data 2 is on submit",data2, formState.streetAddress, "truck id is:",data.trucker_Id.truck)
// console.log("testing one two", data?.trucker_Id.truck)


  try {
//  console.log("trucking id is this:", data?.trucker_Id.truck,  "button value is:", button)
    console.log("hold start date is:", holdStartDate, "hold end date is:", holdEndDate)
    console.log("thumbs in update load is:", thumbsUp)
    await updateLoad({
      // variables: { ...data }
      variables: {
       LoadId: id, streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: parseInt(data2.number),  currentStatus: button, trucker: loadData.getLoad.trucker._id,   confirmed: JSON.parse(formState.confirmed),  dateStart: holdStartDate,  dateEnd: holdEndDate 
      }
    })
  } catch (e) {
    console.error(e);
    // let test = e
    console.log("testing error user form is:", error)
  }
      

  
}

console.log("stored date is:",loadData.getLoad.dateStart)

const handleChangeDate2= (event,date) => {
  console.log("event  from date 2 is:", moment(event).format('YMMDD000000'))
  console.log("starting date is:", moment(startDate), "this date is:", moment(date).format('YMMDD000000'))
  // const { name } = event.target;
  setFormState({
    ...formState,
  dateStart  : date
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

  const handleApprove = event => {
    // setThumbsUp(!thumbsUp)
    console.log("event in thumbs is:", event)
    if(event === "Approve"){
      setThumbsUp(true)
    } 
    if (event === "Disapprove") {
      setThumbsUp(false)
    }
    if(event === "No Rating"){
      setThumbsUp(undefined)
    }
    console.log("thumbs is:", thumbsUp)
  }

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
  
      const approval = thumbsUp ?  (
      
      <div>👍</div>
      
      
      ): <div>👎</div>;
  

  if (Auth.loggedIn() && data2?.me.trucker) {
  
  return (
    <div className="container my-1">
      {/* <Link to="/trucker_login">
        ← Go to Login
      </Link> */}

      <h2 className="white see_through">Modify Load</h2>

      <form onSubmit = {handleSubmit(onSubmit)}
        
        

        className= "white see_through">
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
        {/* <div className="flex-row space-between my-2">
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
        </div> */}
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
      <div>test {loadData.getLoad.rating_dock}</div>
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
        
        {/* <button
        // onClick = {handleApprove}
        >Rating     {approval}

        </button> */}
    
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

        {/* <div className="flex-row space-between my-2">
          <label htmlFor="rating_dock">Rating:</label>
          
          <DropdownButton title = {button2}  
          // onClick = {handleApprove} 
            onSelect = {function (evt) {
            console.log("the new and nice value is:", evt)
            if(evt === "Approve"){
              setThumbsUp(true)
            }
            if(evt === "Disapprove"){
              setThumbsUp(false)
            }
            if(evt === "No Rating"){
              setThumbsUp(undefined)
            }
              // setThumbsUp(evt)
             setButton2(evt)
             testConsole()
            //  handleApprove()
          }}
          ref = {register}
          {...register("rating_dock", {required: true})}
          name = "rating_dock"
          type = "rating_dock"
          > <MenuItem eventKey = "Approve">👍</MenuItem>
              <MenuItem eventKey = "Disapprove">👎</MenuItem>
              <MenuItem eventKey = "No Rating">No Rating</MenuItem>
          </DropdownButton>
        </div> */}

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
              selected={startDate}
              onChange={(date) => {
                setStartDate(date)
                setHoldStartDate(date.toISOString())
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
        <label htmlFor="dateEnd">End Date for Load Drop Off:</label>
        <DatePicker  
              name="dateEnd"
              type="dateEnd"
              id="dateEnd"
              key = "dateEnd"
              selected={endDate}
              ref = {register}
              {...register("dateEnd", {required: true})}
              onChange={(date) => {
                setEndDate(date)
                setHoldEndDate(date.toISOString())

              }}
              // onChange =   {handleChange}

              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
        
 
        
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
}

export default UserForm;