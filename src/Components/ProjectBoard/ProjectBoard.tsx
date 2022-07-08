import { Stack } from "@mui/material";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../Utils/apis/projectsApi";
import { TicketStatusType } from "../../Types/types";
import { useGetTicketsQuery } from "../../Utils/apis/ticketApi";


const TicketLists = ({id}: {id: string}) => {
  const statuses = ["New", "Waiting", "Open", "Checking", "Done"];


  const { data, isLoading } = useGetTicketsQuery({fieldToSearchBy: "project", searchCriteria: `${id}`})

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!data) {
    return <div>No tickets?</div>
  }

  return (
    {data && statuses.map((status) => (
      <BoardList
        key={status}
        status={status as TicketStatusType}
        projectID={id as string}
      />
    ))}
  )
}

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
      </Stack>
    </>
  );
};

export default Board;
