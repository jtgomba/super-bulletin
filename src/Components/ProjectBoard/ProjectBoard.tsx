import { Stack } from "@mui/material";

import BoardList from "./BoardList/BoardList";
import BoardNav from "./BoardNav/BoardNav";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../Utils/apis/firestoreApi";

const Board = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProjectQuery(id as string);

  const statuses = ["New", "Waiting", "Open", "Checking", "Done"];

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
        {statuses.map((status) => (
          <BoardList key={status} status={status} />
        ))}
      </Stack>
    </>
  );
};

export default Board;
