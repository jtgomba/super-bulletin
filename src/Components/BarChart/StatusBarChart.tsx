import { Box } from "@mui/material";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetTicketsQuery } from "../../Utils/apis/ticketApi";
import { useAppSelector } from "../../Utils/hooks";
import { selectUid } from "../../Utils/slices/authSlice";

const StatusBarChart = () => {
  const id = useAppSelector(selectUid);
  const { data } = useGetTicketsQuery({
    fieldToSearchBy: "submittedByID",
    searchCriteria: id,
  });

  let barData = [
    {
      name: "Tickets by Status",
      New: data?.filter((item) => item.status === "New").length,
      Waiting: data?.filter((item) => item.status === "Waiting").length,
      Open: data?.filter((item) => item.status === "Open").length,
      Checking: data?.filter((item) => item.status === "Checking").length,
      Closed: data?.filter((item) => item.status === "Closed").length,
    },
  ];

  return (
    <Box sx={{ width: { xs: "100%", md: "40%" } }}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={barData} barGap="20">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="New" fill="#9ED8DB" />
          <Bar dataKey="Waiting" fill="grey" />
          <Bar dataKey="Open" fill="#467599" />
          <Bar dataKey="Checking" fill="orange" />
          <Bar dataKey="Closed" fill="darkGrey" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StatusBarChart;
