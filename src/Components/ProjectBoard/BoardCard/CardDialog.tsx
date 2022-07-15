import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SegmentIcon from "@mui/icons-material/Segment";
import NavigationIcon from "@mui/icons-material/Navigation";
import { grey } from "@mui/material/colors";

import { useGetTicketsQuery } from "../../../Utils/apis/ticketApi";

interface DialogProps {
  open: boolean;
  cardId: string;
  children?: React.ReactNode;
  handleClose: () => void;
}

const CardDialog = ({ open, handleClose, cardId }: DialogProps) => {
  const { id } = useParams();
  const { ticket } = useGetTicketsQuery(
    {
      fieldToSearchBy: "projectID",
      searchCriteria: `${id}`,
    },
    {
      selectFromResult: ({ data }) => ({
        ticket: data?.find((ticket) => ticket.id === cardId),
      }),
    }
  );

  const [formData, setFormData] = useState(ticket);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="card-dialog-title"
      aria-describedby="card-dialog-description"
      scroll={"paper"}
      maxWidth={"md"}>
      <DialogTitle
        id="card-dialog-title"
        sx={{ display: "flex", alignItems: "center" }}>
        <NavigationIcon
          sx={{ transform: " rotate(90deg)", marginRight: 1 }}
          fontSize="small"
        />
        <Typography variant="h4">{formData?.title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ minWidth: "45vw" }}>
        <DialogContentText id="card-dialog-description">
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}>
            <SegmentIcon
              sx={{ transform: "scaleX(-1)", marginRight: 1 }}
              fontSize="small"
            />
            Description
          </Typography>
          <Typography
            sx={{
              marginLeft: 4,
              marginTop: 2,
              padding: 1,
              color: "black",
              backgroundColor: grey[50],
            }}>
            {formData && formData?.description
              ? formData?.description
              : "This ticket is expecting a description"}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          variant="contained"
          color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;
