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
        <div role="alert">
          <h2 className="error error__title">Validation errors</h2>
          <div className="">
            <ul className="no-bull">
              {/* Displays validation errors */}
              {validationErrors.map((error, index) => {
                return (
                  <li className="error error__msg " key={`validation-${index}`}>
                    {error.message}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
