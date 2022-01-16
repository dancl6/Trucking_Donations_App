import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { GET_TRUCKER_LOADS, GET_LOAD } from "../utils/queries";
// import { useStoreContext } from '../utils/GlobalState'
import { TRUCKER_LOADS } from "../utils/actions";

function GetLoad({loadId}) {
    const { loading, error, data } = useQuery(GET_LOAD, {
        variables: {loadId},
    })
    return data
}

export default GetLoad;