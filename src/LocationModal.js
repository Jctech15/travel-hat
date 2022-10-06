import "./LocationModal.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
/* import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
 */

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LocationModal(props) {
  return (
    <div className="LocationModal">
      <Modal open={props.openModal} onClose={props.handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            {props.randomLocationOuput}
          </Typography>
          <Typography id="modal-modal-description" variant="h5" sx={{ mt: 2 }}>
            GO BOOK YOUR FLIGHT!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
