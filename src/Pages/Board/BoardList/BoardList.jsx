import { Stack, Typography, Button, Box } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

import BoardCard from "../BoardCard/BoardCard";

const BoardList = () => {
  return (
    <Stack
      sx={{
        backgroundColor: grey[200],
        padding: 1,
        maxWidth: 280,
        borderRadius: 1,
      }}
      alignItems="column"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom component="p" variant="h6">
          List Name
        </Typography>
        <MoreHorizIcon />
      </Stack>
      <Stack spacing={1} alignItems="stretch" sx={{ marginBottom: 1 }}>
        <BoardCard />
        <BoardCard />
      </Stack>
      <Box>
        <Button startIcon={<AddIcon />} color="inherit">
          Add another card
        </Button>
      </Box>
    </Stack>
  );
};

export default BoardList;
