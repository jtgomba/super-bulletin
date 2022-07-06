import React from "react";
import { Stack } from "@mui/material";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";
import BoardListForm from "./BoardList/BoardListForm/BoardListForm";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../Utils/hooks";
import { selectProjects } from "../../Utils/slices/projectsSlice";
import { TicketType } from "../../Types/types";

const Board = () => {
  const { id } = useParams();
  /*   const project = useAppSelector(selectProjects).filter(
    (project) => project.id === id
  )[0];
 */
  const listNames = ["Low", "Normal", "Medium", "High"];

  return (
    <>
      <BoardNav id={id} />

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
