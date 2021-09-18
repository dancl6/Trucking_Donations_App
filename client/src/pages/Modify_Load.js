import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from "react-hook-form"
import { UPDATE_LOAD } from '../utils/mutations';
import { TRUCK_ID_IS } from '../utils/queries';
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'

const Modify_Load = () => {
  const [data, setData ] = useState(null)

  useEffect(() => {
    
  })
}

export default Modify_Load;