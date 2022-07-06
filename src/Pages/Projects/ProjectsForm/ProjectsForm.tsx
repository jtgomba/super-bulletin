import { useState } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useCreateProjectMutation } from "../../../Utils/apis/firestoreApi";

const initialState = {
  title: "",
  description: "",
};

const ProjectsForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [createProject] = useCreateProjectMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ title: "", description: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Stack
        component="form"
        autoComplete="off"
        alignItems="strech"
        direction="column"
        spacing={2}
        sx={{ minWidth: "300px" }}
        onSubmit={handleSubmit}>
        <Typography variant="h5">Create a project</Typography>
        <TextField
          name="title"
          required
          id="outlined-required"
          onChange={handleChange}
          value={formData.title}
          label="Title"
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          name="description"
          required
          id="outlined-required"
          onChange={handleChange}
          value={formData.description}
          label="Description"
          minRows={3}
          multiline
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <Button variant="contained" type="submit">
          Create Project
        </Button>
      </Stack>
    </>
  );
};

export default ProjectsForm;
