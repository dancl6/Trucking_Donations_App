import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TRUCKER_LOADS} from "../utils/queries";
import Button from 'react-bootstrap/Button'

const Test_State = () => {
    const [cars, setCars] = useState([])
    const [count, setCount] = useState(1)
    const [arr1, setArr1] = useState(                
        [{id:'124',name:'qqq'},
    {id:'589',name:'www'},
    {id:'45',name:'eee'},
    {id:'567',name:'rrr'}]
    )
    const handleRemoveItem = (e) => {
        // const name = e.target.getAttribute("name")
         setArr1(arr1.filter(item => item.id !== "45"));
         console.log("arr1 is on handle remove:", arr1)
       };
     let key = "id"
     let value = "me"
     let index = 1
    const setFirstIndex = (key,value,index) => {
        // setArr1(existingValues => ({
        //     ...existingValues,
        //     id: e.target.value,
        // }))
        const array = arr1[index]
        array[key] = value
        setArr1([
            // ...arr1, {id:"124", name: "dannyman" } 
        ...arr1.slice(0, index),
        array,
        ...arr1.slice(index + 1, arr1.length)
        ])
    }
    // let test = 4
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    // posts = data?.getTruckerLoads.map((post, i) => (
    //     <li key={i} className="list-group-item">{post.text}</li>
    //   ));
    // arr1 = [
    //     {id:'124',name:'qqq'},
    //     {id:'589',name:'www'},
    //     {id:'45',name:'eee'},
    //     {id:'567',name:'rrr'}
    //  ];
     if (arr1) {
    console.log("arr1 is:", arr1)
     }
      const Car = ({ 
        id
        // Model, 
        // Make, 
        // Registration, 
        // Owner, 
        // Address, 
        // previousOwners
      }) => (
        <tr key = "trparent">
          <td key = "tdparent">{id}</td>
          {/* <td>{Model}</td>
          <td>{Make}</td>
          <td>{Registration}</td>
          <td>{Owner}</td>
          <td>{Address}</td> */}
          {/* Change this next line to handle your previousOwners structure */}
          {/* <td>{previousOwners.map(({ name }) => name).join(", ")}</td> */}
        </tr>
      );

      useEffect(() => {
        try {
            setArr1 (
                [{id:'124',name:'qqq'},
                {id:'589',name:'www'},
                {id:'45',name:'eee'},
                {id:'567',name:'rrr'}]
            )
            
              if (data) {
            //    setCars(data.getTruckerLoads)
            setCount(100)

          }
        }
          catch(error){console.error(error)};
      }, []);

      
    return (
        <div key = "parentdiv">
        <button key = "button1" onClick={() => 
            // setArr1([{id:'123',name:'qqq'},
            // {id:'589',name:'www'},
            // {id:'45',name:'eee'},
            // {id:'567',name:'rrr'}])
            console.log("arr1 is now:", setArr1)
            }>
            {arr1.map(arr1 => <Car key={arr1._id} {...arr1} />)}

        </button>
        <form  >
        <input 
        onChange = {(event) => {
            const { name, value } = event.target
            setFirstIndex({
                ...arr1,
                id: "123",
                [name]: value
            })
        }}
        value = {arr1.id}
        // onChange = {setFirstIndex}
        ></input>
        {/* <button onClick = {() => setFirstIndex(key,value,index)}> */}
        <button onClick = {handleRemoveItem}>
            Click
        </button>
        </form>
    <button key = "button2" onClick ={() => 
    //  console.log("test")
     arr1.shift()
     } > Shift
    </button>

        <div key = "listcontainer" id="listcontainer">
        <h6 key = "h6">Car List</h6>
        <table key = "table">
          <thead key = "thead">
            <tr key = "tr" className="theaderrow">
              <th key = "th" id="th-cell-left">ID</th>

            </tr>
          </thead>
          {/* <tbody>
              
              
              {arr1.map(arr1 => <Car key={arr1._id} {...arr1} />)}</tbody> */}
        </table>
      </div>
      </div>

            // <div>
            //   <ul className="list-group list-group-flush">
            //     {posts}
            //   </ul>
            // </div>
       
    
        )

}


export default Test_State;