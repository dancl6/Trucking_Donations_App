import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TRUCKER_LOADS} from "../utils/queries";
import Button from 'react-bootstrap/Button'

const Test_State = () => {
    const [cars, setCars] = useState([])
    const [count, setCount] = useState(1)
    // let test = 4
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    // posts = data?.getTruckerLoads.map((post, i) => (
    //     <li key={i} className="list-group-item">{post.text}</li>
    //   ));

      const Car = ({ 
        _id
        // Model, 
        // Make, 
        // Registration, 
        // Owner, 
        // Address, 
        // previousOwners
      }) => (
        <tr>
          <td>{_id}</td>
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
              if (data) {
               setCars(data.getTruckerLoads)

          }}
          catch(error){console.error(error)};
      }, []);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    

    //     <div id="listcontainer">
    //     <h6>Car List</h6>
    //     <table>
    //       <thead>
    //         <tr className="theaderrow">
    //           <th id="th-cell-left">ID</th>

    //         </tr>
    //       </thead>
    //       <tbody>{cars.map(car => <Car key={car._id} {...car} />)}</tbody>
    //     </table>
    //   </div>

            // <div>
            //   <ul className="list-group list-group-flush">
            //     {posts}
            //   </ul>
            // </div>
       
    
        )

}


export default Test_State;