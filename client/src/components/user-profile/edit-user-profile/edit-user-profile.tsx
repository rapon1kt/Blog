import React from "react";
import { Stack, Button } from "@mui/material";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditUserProfile({ userId }: { userId: string }) {
	const router = useRouter();

	return (
		<Stack sx={{ gap: "1rem", my: 1, width: "100%" }}>
			<Button
				variant="contained"
				fullWidth
				sx={{ bgcolor: "#0a3d8f", gap: 1, color: "white", height: "2rem" }}
				onClick={() => router.push(`/config/${userId}`)}
			>
				<Edit size={20} />
				Editar Informações
			</Button>
		</Stack>
	);
}
