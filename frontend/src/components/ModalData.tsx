import React, { useState } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";

type ModalDataProps = {
  title: string;
  content: string;
  showBtn?: boolean;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'darkslategray',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalData = ({ title, content, showBtn = true }: ModalDataProps): JSX.Element => {
  const [open, setOpen] = useState < any > (true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {showBtn && <Button onClick={handleOpen}>Open modal</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalData;