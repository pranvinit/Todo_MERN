import React from "react";

const AsyncAlert = ({ message, severity, open, changeOpen }) => {
  return (
    <div>Alert</div>
    // <Collapse in={open}>
    //   <Alert
    //     severity={severity}
    //     action={
    //       <IconButton
    //         aria-label="close"
    //         color="inherit"
    //         size="small"
    //         onClick={() => changeOpen(false)}
    //       >
    //         <Close />
    //       </IconButton>
    //     }
    //   >
    //     {message}
    //   </Alert>
    // </Collapse>
  );
};
export default AsyncAlert;
