import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Alertbox = ({openalert, handleAlertClose, message, severity}) => {
  const { vertical, horizontal } = {
    vertical: "top",
    horizontal: "center",
  };
  console.log(openalert)
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={openalert}
      autoHideDuration={2000}
      onClose={handleAlertClose}
      key={vertical + horizontal}
    >
      <Alert
        variant="filled"
        onClose={handleAlertClose}
        severity={severity}
        sx={{ width: "25vw" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Alertbox;