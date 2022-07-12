import { Typography, Stack } from "@mui/material";
import PriorityBarChart from "../../Components/BarChart/PriorityBarChart";
import StatusBarChart from "../../Components/BarChart/StatusBarChart";
import ProjectPieChart from "../../Components/PieChart/ProjectPieChart";
import TypePieChart from "../../Components/PieChart/TypePieChart";
import { useGetUserQuery } from "../../Utils/apis/authApi";
import { useAppSelector } from "../../Utils/hooks";
import { selectUid } from "../../Utils/slices/authSlice";

const Dashoboard = () => {
  const id = useAppSelector(selectUid);
  const { data, isLoading } = useGetUserQuery(id);
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Welcome, {!isLoading && data?.name}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        sx={{ flexWrap: "wrap" }}>
        <PriorityBarChart />
        <TypePieChart />
        <StatusBarChart />
        <ProjectPieChart />
      </Stack>
    </>
  );
};

export default Dashoboard;
