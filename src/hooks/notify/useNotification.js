import { toast } from "react-toastify";

//to make notifaction to any component
export function notify(msg, type) {
  // if (msg.type === "object") {
  //   const arrnot = msg.map((item, index) => <diav key={index}>{item}</diav>);
  //   toast.error(arrnot);
  // }
  if (type === "warn") toast.warn(msg);
  else if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
}
