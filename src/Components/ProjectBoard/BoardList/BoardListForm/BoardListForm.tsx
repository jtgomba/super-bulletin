import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  InputBase,
  IconButton,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { TicketStatusType } from "../../../../Types/types";
import { useAppSelector } from "../../../../Utils/hooks";
import { useCreateTicketMutation } from "../../../../Utils/apis/ticketApi";
import { selectUid } from "../../../../Utils/slices/authSlice";

const BoardListForm = ({
  status,
  projectID,
}: {
  status: TicketStatusType;
  projectID: string;
}) => {
  const userID = useAppSelector(selectUid);

  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const [ticketTitle, setTicketTitle] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleAddTicket = () => {
    if (ticketTitle.length > 0) {
      createTicket({
        title: ticketTitle,
        status: status,
        projectID: projectID,
        submittedByID: userID,
      });
      setTicketTitle("");
      setShowForm(false);
    }
  };

  return (
    <Box>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={280}
          height={100}
        />
      )}
      {!showForm ? (
        <Button
          startIcon={<AddIcon />}
          color="inherit"
          onClick={() => setShowForm(!showForm)}>
          Add another card
        </Button>
      ) : (
        <>
          <Paper sx={{ padding: 1, marginBottom: 1 }}>
            <InputBase
              placeholder="Enter the tickets title"
              minRows={2}
              multiline
              autoFocus
              value={ticketTitle}
              onChange={(e) => setTicketTitle(e.target.value)}
            />
          </Paper>
          <Button variant="contained" color="success" onClick={handleAddTicket}>
            Create
          </Button>
          <IconButton onClick={() => setShowForm(!showForm)}>
            <CloseRoundedIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default BoardListForm;
