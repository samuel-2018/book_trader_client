import React from "react";
import { Link } from "react-router-dom";

export const User = props => {
  return (
    <Link
      className="no-decoration"
      to={{
        pathname: `/users/${props.userData.userId}`,
        state: { from: props.location }
      }}
    >
      <div className="user">
        <div className="user__info">
          <p className="user__info__username pad-s">
            Username: {props.userData.username}
          </p>

          <p className="user__info__fullname pad-s">
            Full name:{" "}
            {`${props.userData.firstName}  ${props.userData.lastName}`}
          </p>

          <p className="user__info__location pad-s">
            Location:{" "}
            {`${props.userData.city}, ${props.userData.state}, ${props.userData.country}`}
          </p>
        </div>
      </div>
    </Link>
  );
};
