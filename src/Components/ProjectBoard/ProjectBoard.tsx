import { Stack } from "@mui/material";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../Utils/apis/projectsApi";
import { TicketStatusType } from "../../Types/types";
import { useGetTicketsQuery } from "../../Utils/apis/ticketApi";

const Board = () => {
  const { id } = useParams();
  const { data: project, isLoading: projectLoading } = useGetProjectQuery(
    id as string
  );
  const { data: tickets } = useGetTicketsQuery({
    fieldToSearchBy: "projectID",
    searchCriteria: `${id}`,
  });

  const statuses = ["New", "Waiting", "Open", "Checking", "Closed"];

  if (projectLoading) {
    return <div>Loading</div>;
  }

  if (!project) {
    return <div>No project</div>;
  }

  return (
    <>
      <BoardNav projectName={project.projectName} projectId={project.id} />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
        sx={{ height: "72vh", width: "100%", overflow: "auto" }}>
        {tickets &&
          statuses.map((status) => {
            const cardByStatus = tickets.filter(
              (ticket) => ticket.status === status
            );
            return (
              <BoardList
                key={status}
                status={status as TicketStatusType}
                projectID={id as string}
                tickets={cardByStatus}
              />
            );
          })}
      </Stack>
    </>
  );
};

export default Board;
