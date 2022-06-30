import { Box } from "@mui/material";
import React from "react";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";

const Board = () => {
  return (
    <Box>
      <BoardNav />
      <BoardList />
    </Box>
  );
};

export default Board;
