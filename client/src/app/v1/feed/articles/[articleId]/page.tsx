export default function Article({ params }: { params: { articleId: string } }) {
	const { articleId } = params;

	return <h1>{articleId}</h1>;
}
