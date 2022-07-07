import React from "react";
import { Stack } from "@mui/material";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";
import BoardListForm from "./BoardList/BoardListForm/BoardListForm";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../Utils/apis/firestoreApi";

const Board = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProjectQuery(id as string);

  const listNames = ["Low", "Normal", "Medium", "High"];

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
        {/*         {listNames.map((name) => {
          const tickets: TicketType[] = [];
          project.tickets?.forEach((ticket) => {
            if (ticket.priority === name) {
              tickets.push(ticket);
            }
          });
          return <BoardList priority={name} key={name} id={id} />;
        })} */}
        <BoardListForm />
      </Stack>
    </>
  );
};

export default Board;
