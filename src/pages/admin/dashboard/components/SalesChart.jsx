import React from "react";
import {
	LineChart,
	Line,
	YAxis,
	XAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const SalesChart = ({ data }) => {
	return (
		<div className="bg-white rounded-xl p-5 w-full text-xs">
			<ResponsiveContainer width="100%" height={400}>
				<LineChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="label" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="sales"
						stroke="#F3E5AB"
						strokeWidth={3}
						dot={{
							stroke: "#F3E5AB",
							strokeWidth: 2,
							r: 5,
							fill: "#fff",
						}}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SalesChart;
