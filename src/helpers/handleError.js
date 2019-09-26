// 'this' is defined by the caller via call()

// Note: Otherwise, it would have the same
// 'this' as the Provider class. (If turned
// into an arrow function, 'this' would be
// undefined.)

export function handleError({ error }) {
  try {
    // Handling Errors, Axios API
    // https://github.com/axios/axios#handling-errors

    if (error.response) {
      // The request was made and the server responded with
      // a status code that falls out of the range of 2xx

      // Is it a validation error?
      if (error.response.data.name === "SequelizeValidationError") {
        // Adds an array of errors to state
        this.setState({
          validationErrors: error.response.data.validationErrors
        });
      } else if (error.response.status === 404) {
        this.props.history.replace(`/notfound`);
      } else if (error.response.status === 401) {
        this.props.history.replace(`/forbidden`);
      } else {
        // Handles code 500
        this.props.history.replace(`/error`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of http.ClientRequest
      // in node.js

      // console.log("handleError", this);

      this.props.history.replace(`/error`);

      // console.log("handleError", this.props.history);
    } else {
      // Something happened in setting up the request that triggered an Error

      this.props.history.replace(`/error`);
    }
  } catch (error) {
    console.log("error created in the error handler");

    // Handles errors created in the error handler
    window.location.pathname = "/error";
  }
}
