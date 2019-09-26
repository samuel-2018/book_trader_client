import React from "react";
export const validationMessages = validationErrors => {
  // console.log(validationErrors);

  return (
    <>
      {/* Are there validation errors? */}
      {!validationErrors ? (
        ""
      ) : (
        // <p>test</p>
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {/* Displays validation errors */}
              {validationErrors.map((error, index) => {
                return <li key={`validation-${index}`}>{error.message}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
