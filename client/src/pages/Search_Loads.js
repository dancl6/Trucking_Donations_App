// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from '@apollo/react-hooks';
// import Auth from "../utils/auth";
// import { ADD_TRUCKING_USER } from "../utils/mutations";

// // function Trucker_Signup() {
// const Search_Loads = () => {
//   const [formState, setFormState] = useState({ userName: '', phoneNumber: '', password: '' });
//   const [addTruckingUser, { error }] = useMutation(ADD_TRUCKING_USER);



//   const handleFormSubmit = async event => {
//     event.preventDefault();

//     try {
//       const { data } = await addTruckingUser({
//         variables: { ...formState }
//       });
      
//       Auth.login(data.addTruckingUser.token);
//     } catch (e) {
//       console.error(e);
//     }
//     console.log(error)
//   }
  
//   const handleChange = event => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value
//     });
//   };


//   return (
//     <main className='flex-row justify-center mb-4 d-flex justify-content-center'>
//       <div className='col-12 col-md-6 '>
//         <div className='card'>
//       {/* <Link to="/trucker_login">
//         ← Go to Login
//       </Link> */}

//       <h4 className='card-header center_text'>Trucker Signup</h4>
//       <div className='card-body center_text'>
//       <form onSubmit={handleFormSubmit}>
//         <div className="flex-row space-between my-2 center_text">
//           <label htmlFor="userName">Username:</label>
//           <input
//             placeholder="Username"
//             name="userName"
//             type="userName"
//             id="userName"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex-row space-between my-2 center_text">
//           <label htmlFor="phoneNumber">Phone Number:</label>
//           <input
//             placeholder="Phone Number"
//             name="phoneNumber"
//             type="phoneNumber"
//             id="phoneNumber"
//             onChange={handleChange}
//           />
//         </div>
//         {/* <div className="flex-row space-between my-2">
//           <label htmlFor="email">Email:</label>
//           <input
//             placeholder="youremail@test.com"
//             name="email"
//             type="email"
//             id="email"
//             onChange={handleChange}
//           />
//         </div> */}
//         <div className="flex-row space-between my-2 center_text">
//           <label htmlFor="password">Password:</label>
//           <input
//             placeholder="Password"
//             name="password"
//             type="password"
//             id="password"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex-row flex-end center_text">
//           <button type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//     </div>
//     </div>
//     </main>
//   );

// }

// export default Search_Loads;
