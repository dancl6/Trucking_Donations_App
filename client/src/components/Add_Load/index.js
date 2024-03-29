import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_LOAD } from "../../utils/mutations";
import { TRUCK_ID_IS, QUERY_ME } from "../../utils/queries";
import { useForm } from "react-hook-form"
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import moment from 'moment';
import Auth  from "../../utils/auth";


const Add_Load = () => {

  const {data: data2} = useQuery(QUERY_ME);
  const [formState, setFormState] = useState({streetAddress: '', state: '' , zipcode: '' , donationItem: '', number: '' , trucker: '', currentStatus: '', confirmed: false, dateStart:'', dateEnd: '' });
  const [formDateStart, setFormDateStart] = useState({month:'', day:'', year:'',hour:'',minute:''})
  const [addLoad, {data:data4, error }] = useMutation(ADD_LOAD);
  const { register, handleSubmit, formState: { errors }
} = useForm();
const [button, setButton] = useState('Open');
const {data} = useQuery(TRUCK_ID_IS);
const [startDefault, setStartDefault] = useState(new Date());
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
const [holdStartDate, setHoldStartDate] = useState(startDate.toISOString())
const [holdEndDate, setHoldEndDate] = useState(endDate.toISOString())
const [value, onChange] = useState('10:00');
let test
// let dateStart = {hour:"", minute:"", day:"", year:"", month:""}
const d = new Date(2018, 1, 24, 10, 33, 30, 0);
useEffect(() => {

},[startDate])

  const onSubmit = async(data2) => {
    console.log(data2.number, formState.streetAddress)


    try {
 console.log("trucking id is this:", data?.trucker_Id.truck,  "button value is:", button)
      await addLoad({
        // variables: { ...data }
        variables: {
          streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: data2.number,  currentStatus: button, trucker: data?.trucker_Id.truck,  rating: data2.rating, confirmed: false,  dateStart: holdStartDate, dateEnd: holdEndDate
        }
      })

        // console.log("data4 from add load is:", data4.addLoad._id)        
    } catch (e) {
      console.error(e);
      let test = e
      console.log("testing error is:", e)
    }
        
    window.location.reload(false)
    
  }


  const handleChangeDate2= (event,date) => {
   console.log("event to iso is:", event.toISOString())

    setHoldStartDate(
      date.toISOString()
    )


    // let newDate = new Date(date._d)
    // const { name } = event.target;
  //   setFormDateStart({
  //     ...formDateStart,
  //     // month: moment(date).month, day: moment(date).date(), hour: moment(date).hour(), minute: moment(date).minute(), year: moment(date).year()
  //     month: 11, day: 25, hour: 4, minute: 34, year: 1999
  // });
  // setFormDateStart({
  //   ...formDateStart,
  //   month:moment(event).month(),
  //   day: moment(event).date(),
  //   hour: moment(event).hour(),
  //   minute: moment(event).minute(),
  //   year: moment(event).year()
  // })
  // dateStart.day = moment(date).date()
  // dateStart.month = moment(date).month()
  // dateStart.hour = moment(date).hour()
  // dateStart.minute = moment(date).minute()
  // dateStart.year = moment(date).year()

  

  };


  const handleChange = event => {
    console.log("event target is:", event.target)
    const { name, value } = event.target;
    
    setFormState({
      ...formState,
      [name]: value
    });
  };


  function loadForm() {
    if (Auth.loggedIn() && data2?.me.trucker) {
  return (
    <div key = "Parent Div" className="container my-1 white ">
      {/* <Link key = "Parent Link" to="/trucker_login">
        ← Go to Login
      </Link> */}

      <h2 key = "Parent h2" className = "see_through">Add Load</h2>
      {/* <form onSubmit=   {handleSubmit(onSubmit)}> */}
      <form onSubmit = {handleSubmit(onSubmit)}
        
        

        >
        <div className="flex-row space-between my-2 see_through">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            placeholder="streetAddress"
            name="streetAddress"
            type="streetAddress"
            id="streetAddress"
            key = "streetAddress"
            // value={formState.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 see_through">
          <label htmlFor="state">State:</label>
          <input
            placeholder="state"
            name="state"
            type="state"
            id="state"
            key = "state"
            // value={formState.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 see_through">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            placeholder="zipcode"
            name="zipcode"
            type="zipcode"
            id="zipcode"
            key = "zipcode"
            // value={formState.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 see_through">
          <label htmlFor="donationItem">Donation Item:</label>
          <input
            placeholder="Donation Item"
            name="donationItem"
            type="donationItem"
            id="donationItem"
            key = "donationItem"
            // value={formState.donationItem}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 see_through">
          <label htmlFor="number">Number:</label>
          <input
          // type = "number" 
          {...register(
                  "number",
                  {       
                    setValueAs: v => parseFloat(v)       
       
                  })} 
 

            onChange={handleChange}
            key = "number"
          />
            {errors.number ? <div>{errors.number.message}</div> : null}
            {test ? <div>{test}</div> : null}
            
        </div>

        <div className="flex-row space-between my-2 see_through">
          <label htmlFor="currentStatus">Current Status:</label>

          <DropdownButton title = {button} onSelect = {function (evt) {
            console.log("the new value is:", evt)

             setButton(evt)
          }}
          key = "currentStatus"
          > <MenuItem eventKey = "Open">Open</MenuItem>
              <MenuItem eventKey = "In Progress">In Progress</MenuItem>
              <MenuItem eventKey = "Closed">Closed</MenuItem>
          </DropdownButton>
        </div>

        <div className="flex-row space-between my-2">
        <label htmlFor="dateStart">Start Date for Load Drop Off:</label>

        <DatePicker  
              name="dateStart"
              type="dateStart"
              id="dateStart"
              key = "dateStart"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date)
                setHoldStartDate(date.toISOString())
                // console.log("value for datepicker is:", value)
                // handleChangeDate2(date)
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
       
        <div className="flex-row space-between my-2">
        <label htmlFor="dateEnd">End Date for Load Drop Off:</label>
        <DatePicker  
              name="dateEnd"
              type="dateEnd"
              id="dateEnd"
              key = "dateEnd"
              selected={endDate}
              onChange={(date) => {
                setEndDate(date)
                setHoldEndDate(date.toISOString())
                console.log("at picker and end iso is:", date.toISOString())
                // console.log("value for datepicker is:", value)
                // handleChangeDate2(date)
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
      



        <div className="flex-row flex-end see_through">
          <button type="submit" >
            Submit
          </button>
        </div>
      </form>
    </div>
  ); } else {}
      }
    
    return (
      <div>
    {loadForm()}
    </div>
    )
  // }
}

export default Add_Load;