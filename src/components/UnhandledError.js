import React from "react";
import DocumentTitle from "react-document-title";

export const UnhandledError = () => {
  return (
    <DocumentTitle title="Error - Book Trader">
      <div className="page-bounds" role="main">
        <div className="page-header">
          <h1>Error</h1>
          <h2>
            Sorry! We just encountered an unexpected error.
          </h2>
        </div>
      </div>
    </DocumentTitle>
  );
};
