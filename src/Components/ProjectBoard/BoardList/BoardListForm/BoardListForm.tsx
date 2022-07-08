import { useState } from "react";
import { Box, Button, Paper, InputBase, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useParams } from "react-router-dom";

import { TicketType } from "../../../../Types/types";
import { useAppDispatch } from "../../../../Utils/hooks";

const BoardListForm = ({ status }: { status: string }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [ticketTitle, setTicketTitle] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleAddTicket = () => {
    console.log(id);
    setShowForm(false);
  };

  return (
    <Box>
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
