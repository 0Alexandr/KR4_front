import { Snackbar, Alert } from '@mui/material';

function SnackbarNotification({ open, message, severity, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarNotification;