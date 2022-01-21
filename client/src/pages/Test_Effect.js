import React, { useState, useEffect } from "react";

const Test_Effect = () => {
    const [test, setTest] = useState(1)
    // let test = 4
    
    useEffect(() => {

        setTest(test+1)

      }, [])
    return (
        <div>
            {test}
        </div>
    )

}


export default Test_Effect;