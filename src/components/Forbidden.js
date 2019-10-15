import React from "react";
import DocumentTitle from "react-document-title";

export const Forbidden = () => {
  return (
    <DocumentTitle title="Forbidden - Book Trader">
      <div className="page-bounds" role="main">
        <div className="page-header">
          <h1>Forbidden</h1>
          <h2>Oh oh! You can't access this page.</h2>
        </div>
      </div>
    </DocumentTitle>
  );
};
