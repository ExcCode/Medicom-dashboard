import { useState } from "react";
import { notify } from "../../notify/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPatient } from "../../../redux/actions/patientAuthActions";

function useLoginHook() {
  // set state to handle data
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // get data from the central state
  const { loading } = useSelector((state) => state.patient);

  // use useDispatch hook to connect data to action
  const dispatch = useDispatch();

  // use useNavigate hook to redirect to other page
  const navigate = useNavigate();

  // check and send form data by dispatch
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobile && password) {
      dispatch(
        loginPatient(
          {
            email,
            password,
          },
          () => setTimeout(() => navigate("/"), 1500)
        )
      );
    } else {
      notify("Please, complete the data", "warn");
    }
  };

  // return data as an array to use in the component
  return [mobile, setMobile, password, setPassword, handleSubmit, loading];
}

export default useLoginHook;
