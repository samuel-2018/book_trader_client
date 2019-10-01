import React from "react";
import { Link } from "react-router-dom";

export const User = props => {
  return (
    <Link
      className="link-wrapper link-no-decoration"
      to={{
        pathname: `/users/${props.userData.userId}`,
        state: { from: props.location }
      }}
    >
      <div className="user">
        <div>
          <p className="pad-s">Username: {props.userData.username}</p>

          <p className="pad-s">
            Full name:{" "}
            {`${props.userData.firstName}  ${props.userData.lastName}`}
          </p>

          <p className="pad-s">
            Location:{" "}
            {`${props.userData.city}, ${props.userData.state}, ${props.userData.country}`}
          </p>
        </div>
      </div>
    </Link>
  );
};
