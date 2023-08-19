"use client";
import React from "react";
import { Pagination } from "@mui/material";

export default function VideoPagination({ totalVideos, paginate }: any) {
	const [page, setPage] = React.useState(1);

	const handleChange = (event: any, newPage: number) => {
		setPage(newPage);
		paginate(page);
	};
	return (
		<Pagination
			count={totalVideos}
			page={page}
			defaultPage={1}
			onChange={handleChange}
		/>
	);
}
