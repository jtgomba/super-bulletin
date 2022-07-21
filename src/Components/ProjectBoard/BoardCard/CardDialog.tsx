import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
  InputBase,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SegmentIcon from "@mui/icons-material/Segment";
import NavigationIcon from "@mui/icons-material/Navigation";
import BookIcon from "@mui/icons-material/Book";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HistoryIcon from "@mui/icons-material/History";
import { blue, grey } from "@mui/material/colors";

import {
  useDeleteTicketMutation,
  useGetTicketsQuery,
} from "../../../Utils/apis/ticketApi";

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
  const [deleteTicket, { isLoading }] = useDeleteTicketMutation();

  const handleDelete = async () => {
    await deleteTicket(cardId);
    handleClose();
  };

  const [formData, setFormData] = useState(ticket);
  //add spacing for assigned to

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
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}>
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <BookIcon sx={{ marginRight: 1, marginBottom: 2 }} fontSize="small" />
          <Typography variant="h4" gutterBottom>
            {formData?.title}
          </Typography>
        </Box>
        <Stack spacing={2} direction="row" sx={{ marginLeft: 4 }}>
          <Chip label={formData?.priority} size="medium" />
          <Chip label="Task" size="medium" />
          <Chip label={formData?.status} size="medium" />
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ minWidth: "45vw" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}>
          <SegmentIcon
            sx={{ transform: "scaleX(-1)", marginRight: 1 }}
            fontSize="small"
          />
          Description
        </Typography>
        <DialogContentText id="card-dialog-description">
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
              : "Add a description"}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogContent sx={{ minWidth: "45vw" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}>
          <QuestionAnswerIcon sx={{ marginRight: 1 }} fontSize="small" />
          Comments
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Avatar sx={{ bgcolor: blue[500], marginRight: "0.5rem" }}>JG</Avatar>
          <InputBase
            sx={{
              border: `1px solid ${grey[300]}`,
              padding: "5px",
              flex: "1",
            }}
            placeholder="Write a comment"
            /*               value={ticketTitle}
              onChange={(e) => setTicketTitle(e.target.value)} */
          />
        </Box>
      </DialogContent>
      <DialogContent sx={{ minWidth: "45vw" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}>
          <HistoryIcon
            sx={{ transform: "scaleX(-1)", marginRight: 1 }}
            fontSize="small"
          />
          History
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
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
