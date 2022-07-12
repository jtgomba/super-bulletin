import { SetStateAction, useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import { PieChart, Pie, Sector } from "recharts";
import { useAppSelector } from "../../Utils/hooks";
import { selectUid } from "../../Utils/slices/authSlice";
import { useGetTicketsQuery } from "../../Utils/apis/ticketApi";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333">{`Tickets: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999">
        {`(Ratio ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const TypePieChart = () => {
  const id = useAppSelector(selectUid);

  const { data: tickets } = useGetTicketsQuery({
    fieldToSearchBy: "submittedByID",
    searchCriteria: id,
  });

  const resultData = [
    {
      name: "Task",
      value: tickets?.filter((ticket) => ticket.type === "Task").length,
    },
    {
      name: "Announcement",
      value: tickets?.filter((ticket) => ticket.type === "Announcement").length,
    },
    {
      name: "Issue",
      value: tickets?.filter((ticket) => ticket.type === "Issue").length,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: SetStateAction<number>) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={resultData}
            cx={"50%"}
            cy={"50%"}
            innerRadius={60}
            outerRadius={80}
            fill="#0088FE"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
      <Typography>Tickets by Type</Typography>
    </Box>
  );
};

export default TypePieChart;
