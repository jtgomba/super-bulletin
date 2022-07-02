import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Ticket } from "../../../Types/types";

const BoardCard = ({ title, priority, description }: Ticket) => {
  const [prio, setPrio] = useState<
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined
  >();

  useEffect(() => {
    if (priority === "medium") {
      setPrio("warning");
    }
  }, [priority]);

  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardHeader
        sx={{ padding: 1 }}
        avatar={<Chip label="With Text" size="small" color={prio} />}
      />
      <CardContent sx={{ padding: "0px 0px 0px 10px" }}>
        <Typography component="p" variant="h6">
          {title}
        </Typography>
        <Typography component="p" variant="subtitle1">
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex" }}>
        <IconButton aria-label="Example">
          <FileOpenIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default BoardCard;
