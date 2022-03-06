import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TRUCKER_LOADS} from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState'
import CardDeck from 'react-bootstrap/CardDeck'
import IndividualLoad from '../IndividualLoad';
const LoadList2 = () => {
    const [state, dispatch] = useStoreContext();
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    return (
        <div>
            {data.length? (

                   <CardDeck>
                {data.map(data1 =>(

                    <IndividualLoad
                    key = {data1._id}
                    name = {data1._id}
                     />
                     
                     ))}
                </CardDeck>
            ): (<h3>No exercises found. There may be a problem with the connection to Mongo Atlas DB.</h3>
            )}
        </div>
    )
}