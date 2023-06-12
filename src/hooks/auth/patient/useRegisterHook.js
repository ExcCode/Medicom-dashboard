import { useState } from "react";
import { notify } from "../../notify/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../../../redux/actions/patientAuthActions";

function useRegisterHook() {
  // set state to handle data
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // get data from the central state
  const { loading } = useSelector((state) => state.patient);

  // use useDispatch hook to connect data to action
  const dispatch = useDispatch();

  // use useNavigate hook to redirect to other page
  const navigate = useNavigate();

  // check data values
  // const validationValues = () => {
  //   if (name === "") {
  //     notify("من فضلك ادخل اسم المستخدم", "warn");
  //     return;
  //   }
  //   if (mobile === "") {
  //     notify("من فضلك ادخل رقم هاتف صحيح", "warn");
  //     return;
  //   }
  // };

  // check and send form data by dispatch
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && mobile && password) {
      dispatch(
        registerPatient(
          {
            name,
            mobile,
            password,
          },
          () => setTimeout(() => navigate("/reactjs/template/login"), 1500)
        )
      );
    } else {
      notify("Please, complete the data", "warn");
    }
  };

  // return data as an array to use in the component
  return [
    name,
    setName,
    mobile,
    setMobile,
    password,
    setPassword,
    handleSubmit,
    loading,
  ];
}

export default useRegisterHook;
