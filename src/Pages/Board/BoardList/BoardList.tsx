import { Stack, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { grey } from "@mui/material/colors";

import BoardCard from "../BoardCard/BoardCard";
import { useAppSelector } from "../../../Utils/hooks";
import { selectTickets } from "../../../Utils/reducers/ticketsReducer";
import BoardListForm from "./BoardListForm/BoardListForm";

const BoardList = () => {
  const tickets = useAppSelector(selectTickets);

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
      <BoardListForm />
    </Stack>
  );
};

export default BoardList;
