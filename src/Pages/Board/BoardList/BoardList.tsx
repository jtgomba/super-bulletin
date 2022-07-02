import { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import BoardCard from "../BoardCard/BoardCard";
import { Ticket } from "../../../Types/types";
import { useAppSelector, useAppDispatch } from "../../../Utils/hooks";
import {
  addTicket,
  selectTickets,
} from "../../../Utils/reducers/ticketsReducer";

const BoardList = () => {
  const tickets = useAppSelector(selectTickets);
  const dispatch = useAppDispatch();
  const [ticketTitle, setTicketTitle] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const ticketg: Ticket = {
    id: "1",
    title: ticketTitle,
    description: "",
    ticketList: "",
    priority: "low",
    status: "open",
    type: "task",
  };

  const handleAddTicket = () => {
    setShowForm(!showForm);
    dispatch(addTicket(ticketg));
    setTicketTitle("");
  };

  return (
    <Stack
      sx={{
        backgroundColor: grey[200],
        padding: 1,
        maxWidth: 280,
        borderRadius: 1,
      }}
      alignItems="column"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom component="p" variant="h6">
          List Name
        </Typography>
        <MoreHorizIcon />
      </Stack>
      <Stack spacing={1} alignItems="stretch" sx={{ marginBottom: 1 }}>
        {tickets &&
          tickets.map((ticket) => (
            <BoardCard
              title={ticket.title}
              description={ticket.description}
              id={ticket.id}
              priority={ticket.priority}
              status={ticket.status}
              type={ticket.type}
              ticketList={ticket.ticketList}
            />
          ))}
      </Stack>
      <Box>
        {!showForm ? (
          <Button
            startIcon={<AddIcon />}
            color="inherit"
            onClick={() => setShowForm(!showForm)}
          >
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
            <Button
              variant="contained"
              color="success"
              onClick={handleAddTicket}
            >
              Create
            </Button>
            <IconButton onClick={() => setShowForm(!showForm)}>
              <CloseRoundedIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default BoardList;
