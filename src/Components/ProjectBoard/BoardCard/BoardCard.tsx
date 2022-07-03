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
import { TicketType } from "../../../Types/types";

const BoardCard = ({ title, priority, description }: TicketType) => {
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
    <Card sx={{ width: 280 }}>
      <CardHeader
        sx={{ padding: 1 }}
        avatar={<Chip label="With Text" size="small" color={prio} />}
      />
      <CardContent sx={{ padding: "0px 0px 0px 10px" }}>
        <Typography component="p" variant="body1" sx={{ marginRight: 1 }}>
          {title}
        </Typography>
        <Typography component="p" variant="body2">
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
