import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Divider,
  Button,
  Typography,
} from "@mui/material/";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGetUsersQuery } from "../../../Utils/apis/authApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Form = () => {
  const { data } = useGetUsersQuery();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [role, setRole] = React.useState("");

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" gutterBottom>
        Assign user roles
      </Typography>
      <FormControl
        variant="outlined"
        sx={{ m: 1, width: 300, backgroundColor: "white" }}>
        <InputLabel htmlFor="outlined-select-users">
          Select one or more users
        </InputLabel>
        <Select
          id="outlined-select-users"
          label="Select one or more users"
          multiple
          value={personName}
          onChange={handleChange}
          MenuProps={MenuProps}>
          {data &&
            data.map((user) => (
              <MenuItem
                key={user.name}
                value={user.name}
                style={getStyles(user.name, personName, theme)}>
                {user.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Divider sx={{ margin: "20px 0px" }} />
      <FormControl
        variant="outlined"
        sx={{ m: 1, width: 300, backgroundColor: "white" }}>
        <InputLabel htmlFor="outlined-select-projects">
          Select the role to assign
        </InputLabel>
        <Select
          id="outlined-select-projects"
          label="Select a proect to assign to"
          value={role}
          onChange={handleRoleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"user"}>User</MenuItem>
          <MenuItem value={"manager"}>Manager</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{ marginTop: "20px" }} variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default Form;
