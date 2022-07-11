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
import { TicketType } from "../../Types/types";
import { useGetTicketsQuery } from "../../Utils/apis/ticketApi";
import { useAppSelector } from "../../Utils/hooks";
import { selectUid } from "../../Utils/slices/authSlice";

const BarChartComp = () => {
  const id = useAppSelector(selectUid);
  const { data, isLoading } = useGetTicketsQuery({
    fieldToSearchBy: "submittedByID",
    searchCriteria: id,
  });

  let barData = [
    {
      name: "Tickets by Priority",
      None: data?.filter((item) => item.priority === "None").length,
      Low: data?.filter((item) => item.priority === "Low").length,
      Medium: data?.filter((item) => item.priority === "Medium").length,
      High: data?.filter((item) => item.priority === "High").length,
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
          <Bar dataKey="None" fill="lightGreen" />
          <Bar dataKey="Low" fill="gold" />
          <Bar dataKey="Medium" fill="orange" />
          <Bar dataKey="High" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartComp;
