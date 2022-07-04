import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../Utils/hooks";
import { selectProjects } from "../../Utils/reducers/projectsSlice";

const Projects = () => {
  let navigate = useNavigate();

  const projects = useAppSelector(selectProjects);

  return (
    <>
      <Typography variant="h2" gutterBottom>
        My Projects
      </Typography>
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
            {projects.map((project) => (
              <TableRow
                key={project.id}
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
                <TableCell align="right">{project.manager.name}</TableCell>
                <TableCell align="right">{project.tickets.length}</TableCell>
                <TableCell align="right">{project.users.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Projects;
