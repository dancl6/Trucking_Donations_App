import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function IndividualLoad(load) {
  const {
    _id,
    state,
    zipcode,
    // imageName
  } = load;

  return (

    <div className="col-12 col-md-6 col-lg-4 mb-3 align-items-stretch">
      <Card>
        <Card.Body>
          {/* <Link to={`/exercise/${_id}`}>

          </Link> */}
          <Card.Text>
            {_id}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default IndividualLoad;