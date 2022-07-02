import { Stack, Typography, Button, Box } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

import BoardCard from "../BoardCard/BoardCard";
import { Ticket } from "../../../Types/types";

const tickets: Ticket[] = [
  {
    id: "1",
    title: "My first card",
    description: "This is the description",
    priority: "medium",
    status: "open",
    type: "announcement",
  },
  {
    id: "2",
    title: "My second card",
    description: "This is the description",
    priority: "medium",
    status: "open",
    type: "announcement",
  },
];

const BoardList = () => {
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
            />
          ))}
      </Stack>
      <Box>
        <Button startIcon={<AddIcon />} color="inherit">
          Add another card
        </Button>
      </Box>
    </Stack>
  );
};

export default BoardList;
