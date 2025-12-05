// src/components/Modal.jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{children}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;