import { Box } from "@mui/material";
import { useOutlet } from "react-router-dom";

const HomeLayout = () => {
  const outlet = useOutlet();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}>
      {outlet}
    </Box>
  );
};

export default HomeLayout;
