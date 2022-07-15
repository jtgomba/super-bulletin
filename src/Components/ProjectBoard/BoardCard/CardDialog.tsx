import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
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

  console.log(id);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="card-dialog-title"
      aria-describedby="card-dialog-description"
      scroll={"paper"}
      maxWidth={"md"}>
      <DialogTitle id="card-dialog-title">{ticket?.title}</DialogTitle>
      <DialogContent sx={{ minWidth: "45vw" }}>
        <DialogContentText id="card-dialog-description">
          {ticket?.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;
