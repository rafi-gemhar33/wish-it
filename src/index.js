import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

function Wrapper(props) {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));
