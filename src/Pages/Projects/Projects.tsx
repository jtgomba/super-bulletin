import { Typography, Stack } from "@mui/material";
import ProjectsForm from "./ProjectsForm/ProjectsForm";

import ProjectsTable from "./ProjectsTable/ProjectsTable";

const Projects = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Manage Projects
      </Typography>
      <Stack
        alignItems="flex-start"
        direction={{ xs: "column", lg: "row" }}
        spacing={2}>
        <ProjectsForm />
        <ProjectsTable />
      </Stack>
    </>
  );
};

export default Projects;
