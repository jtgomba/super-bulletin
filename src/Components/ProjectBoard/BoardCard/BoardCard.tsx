import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { TicketType } from "../../../Types/types";
import SegmentIcon from "@mui/icons-material/Segment";

const BoardCard = ({
  title,
  priority,
  description,
  assignedTo,
  status,
  type = "Task",
}: TicketType) => {
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
    if (priority === "Low") {
      setPrio("primary");
    } else if (priority === "Medium") {
      setPrio("warning");
    } else if (priority === "High") {
      setPrio("error");
    }
  }, [priority]);

  return (
    <Card sx={{ width: 280 }}>
      <CardHeader
        sx={{ padding: 1 }}
        avatar={
          <>
            <Chip label={priority} size="small" color={prio} />
            <Chip label={type} size="small" />
            <Chip label={status} size="small" />
          </>
        }
      />
      <CardContent sx={{ padding: "0px 0px 0px 10px" }}>
        <Typography component="p" variant="body1" sx={{ marginRight: 1 }}>
          {title}
        </Typography>
        <Typography component="p" variant="body2">
          {description}
        </Typography>
      </CardContent>
      {/* icons and stuff go here */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <IconButton aria-label="Example">
          <SegmentIcon sx={{ transform: "scaleX(-1)" }} fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default BoardCard;
