import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  BrowserRouter,
  unstable_HistoryRouter,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";

// toastify
import "react-toastify/dist/ReactToastify.css";
// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
// fontawesome
import "font-awesome/css/font-awesome.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// lightbox
import "react-image-lightbox/style.css";
// react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-datepicker/dist/react-datepicker.css";
// owl.carousel
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// client
import "./client/assets/css/fontawesome.min.css";

if (
  window.location.pathname.includes("admin") ||
  window.location.pathname.includes("medical")
) {
  require("./admin/assets/css/select2.min.css");
  require("./admin/assets/css/font-awesome.min.css");
  require("./admin/assets/css/feathericon.min.css");
  // require("./admin/assets/css/feather.css");
  require("./admin/assets/css/style.css");
  // require("@fortawesome/fontawesome-free/css/all.min.css");
} else {
  require("./client/assets/css/all.min.css");
  require("./client/assets/css/style.css");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense>
        <App />
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
