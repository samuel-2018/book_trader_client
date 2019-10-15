import React from "react";
import DocumentTitle from "react-document-title";

export const NotFound = () => {
  return (
    <DocumentTitle title="Not Found - Book Trader">
      <div className="page-bounds" role="main">
        <div className="page-header">
          <h1>Not Found</h1>
          <h2>
            Sorry! We couldn't find the page you're looking for.
          </h2>
        </div>
      </div>
    </DocumentTitle>
  );
};
