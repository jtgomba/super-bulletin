import { Box, Toolbar } from "@mui/material";
import { Navigate, useOutlet } from "react-router-dom";
import { Navbar } from "../Components";
import { useAppSelector } from "../Utils/hooks";
import { selectAuth } from "../Utils/reducers/authSlice";

const ProtectedLayout = () => {
  const user = useAppSelector(selectAuth);
  const outlet = useOutlet();

  if (user.authenticated === "unauthenticated") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
        }}>
        <Toolbar />
        {outlet}
      </Box>
    </>
  );
};

export default ProtectedLayout;
