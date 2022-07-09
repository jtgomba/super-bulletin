import { Stack } from "@mui/material";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../Utils/apis/projectsApi";
import { TicketStatusType } from "../../Types/types";
import { useGetTicketsQuery } from "../../Utils/apis/ticketApi";

const TicketLists = ({ id }: { id: string }) => {
  const statuses = ["New", "Waiting", "Open", "Checking", "Done"];
  const { data, isLoading } = useGetTicketsQuery({
    fieldToSearchBy: "projectID",
    searchCriteria: `${id}`,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>No tickets?</div>;
  }
  //split data by status
  return (
    <>
      {data &&
        statuses.map((status) => {
          const cardByStatus = data.filter(
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
    </>
  );
};

const Board = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProjectQuery(id as string);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>No project</div>;
  }

  return (
    <>
      <BoardNav projectName={data.projectName} />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}>
        <TicketLists id={id as string} />
      </Stack>
    </>
  );
};

export default Board;
