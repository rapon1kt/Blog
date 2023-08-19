"use client";
import React from "react";
import { Pagination } from "@mui/material";

export default function ArticlePagination({ totalPosts, paginate }: any) {
	const [page, setPage] = React.useState(1);

	const handleChange = (event: any, newPage: number) => {
		setPage(newPage);
		paginate(page);
	};

	const count = totalPosts / 2;

	return (
		<Pagination
			count={parseInt(count.toPrecision(1))}
			page={page}
			defaultPage={1}
			onChange={handleChange}
		/>
	);
}
