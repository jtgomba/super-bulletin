import React from "react";
import { Box } from "@mui/material";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";
import BoardListForm from "./BoardList/BoardListForm/BoardListForm";

const Board = () => {
  return (
    <>
      <BoardNav />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <BoardList />
        <BoardListForm />
      </Box>
    </>
  );
};

export default Board;
