import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TRUCKER_LOADS} from "../utils/queries";
import Button from 'react-bootstrap/Button'

const Test_State = () => {
    const [cars, setCars] = useState([])
    const [count, setCount] = useState(1)
    const [arr1, setArr1] = useState([

     ])
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
        <tr>
          <td>{id}</td>
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
      }, [data]);

      
    return (
        <div>
        <button onClick={() => 
            // setCount(count + 1)
            setArr1([{id:'123',name:'qqq'},
            {id:'589',name:'www'},
            {id:'45',name:'eee'},
            {id:'567',name:'rrr'}])
            // cars.filter(cars => cars.getTruckerLoads.id !== )
            
            }>
            {arr1.map(arr1 => <Car key={arr1._id} {...arr1} />)}

        </button>
    
    <button onClick ={() => 
    //  console.log("test")
     arr1.shift()
     } > Shift
    </button>

        <div id="listcontainer">
        <h6>Car List</h6>
        <table>
          <thead>
            <tr className="theaderrow">
              <th id="th-cell-left">ID</th>

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