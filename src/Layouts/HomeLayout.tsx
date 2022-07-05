import { Box } from "@mui/material";
import { Navigate, useOutlet } from "react-router-dom";
import { useAppSelector } from "../Utils/hooks";
import { selectAuth } from "../Utils/reducers/authSlice";

const HomeLayout = () => {
  const user = useAppSelector(selectAuth);
  const outlet = useOutlet();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {outlet}
    </Box>
  );
};

export default HomeLayout;
