import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";

import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
});
