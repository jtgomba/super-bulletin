import { IconButton, Stack, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { blueGrey } from "@mui/material/colors";

import BoardCard from "../BoardCard/BoardCard";
import BoardListForm from "./BoardListForm/BoardListForm";
import { TicketStatusType, TicketType } from "../../../Types/types";

interface BoardListInterface {
  status: TicketStatusType;
  projectID: string;
  tickets: TicketType[];
}

const BoardList = ({ status, projectID, tickets }: BoardListInterface) => {
  /*   const tickets = useAppSelector(selectProjects)
    .filter((project) => project.id === id)[0]
    .tickets?.filter((ticket) => ticket.priority === priority); */

  return (
    <Stack
      sx={{
        backgroundColor: blueGrey[100],
        padding: 1,
        width: 300,
        borderRadius: 1,
      }}
      alignItems="column">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom component="p" variant="h6">
          {status}
        </Typography>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Stack>
      <Stack
        spacing={1}
        alignItems="center"
        sx={{
          marginBottom: 1,
          maxHeight: "65vh",
          overflow: "hidden auto",
          "&:last-child": { dispaly: "none" },
        }}>
        {tickets &&
          tickets.map((ticket) => (
            <BoardCard
              key={ticket.id}
              title={ticket.title}
              description={ticket.description}
              id={ticket.id}
              priority={ticket.priority}
              status={ticket.status}
              type={ticket.type}
              createdAt={ticket.createdAt}
              projectID={ticket.projectID}
            />
          ))}
      </Stack>
      <BoardListForm status={status} projectID={projectID} />
    </Stack>
  );
};

export default BoardList;
