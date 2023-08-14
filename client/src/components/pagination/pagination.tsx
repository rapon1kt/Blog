"use client";
import React from "react";
import { Pagination } from "@mui/material";

const ArticlePagination = ({ totalPosts, paginate }: any) => {
	const [page, setPage] = React.useState(1);

	const handleChange = (event: any, newPage: number) => {
		setPage(newPage);
		paginate(page);
	};

	const count = totalPosts / 2;

	console.log(count);

	return (
		<Pagination
			count={count}
			page={page}
			defaultPage={1}
			onChange={handleChange}
		/>
	);
};

export default ArticlePagination;
