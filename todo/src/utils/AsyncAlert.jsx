import React from "react";

// material-ui imports
import { Alert } from "@material-ui/lab";
import { Collapse, IconButton } from "@material-ui/core";
import { Close } from "@mui/icons-material";

const AsyncAlert = ({ message, severity, open, changeOpen }) => {
  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => changeOpen(false)}
          >
            <Close />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};
export default AsyncAlert;
