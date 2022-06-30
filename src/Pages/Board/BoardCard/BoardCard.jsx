import React from "react";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Chip,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import FileOpenIcon from "@mui/icons-material/FileOpen";

const BoardCard = () => {
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardHeader
        sx={{ padding: 1 }}
        avatar={<Chip icon={<FaceIcon />} label="With Icon" />}
      />
      <CardContent sx={{ padding: "0px 0px 0px 10px" }}>
        <Typography component="p" variant="h6">
          This is a card
        </Typography>
      </CardContent>
      <CardActionArea sx={{ paddingLeft: 1 }}>
        <IconButton aria-label="Example">
          <FileOpenIcon fontSize="small" />
        </IconButton>
      </CardActionArea>
    </Card>
  );
};

export default BoardCard;
