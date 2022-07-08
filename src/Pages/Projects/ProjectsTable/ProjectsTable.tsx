import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../../../Utils/apis/projectsApi";

import { useAppSelector } from "../../../Utils/hooks";
import { selectUid } from "../../../Utils/slices/authSlice";

const ProjectsTable = () => {
  let navigate = useNavigate();

  const id = useAppSelector(selectUid);

  const { data, isLoading } = useGetProjectsQuery(id);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>No posts</div>;
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Project Description</TableCell>
              <TableCell align="right">Manager</TableCell>
              <TableCell align="right">Tickets</TableCell>
              <TableCell align="right">Users</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((project) => (
              <TableRow
                key={project.projectName}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`${project.id}`, { replace: true })}
                hover>
                <TableCell component="th" scope="row">
                  {project.projectName}
                </TableCell>
                <TableCell align="right">{project.description}</TableCell>
                <TableCell align="right">{project.managerID}</TableCell>
                <TableCell align="right">{project.tickets?.length}</TableCell>
                <TableCell align="right">{project.users?.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectsTable;
