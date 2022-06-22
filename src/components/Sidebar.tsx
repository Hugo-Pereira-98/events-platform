import { gql, useQuery } from '@apollo/client';
import Lesson from './Lesson';

interface GetLessonsQueryResponse {
	lessons: {
		id: string;
		title: string;
		slug: string;
		availableAt: string;
		type: 'class' | 'live';
	}[];
}

export default function Sidebar() {
	const { data } = useQuery<GetLessonsQueryResponse>(gql`
		query {
			lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
				id
				type: lessonType
				availableAt
				title
				slug
			}
		}
	`);

	return (
		<aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
			<span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
				Cronograma de aulas
			</span>

			<div className="flex flex-col gap-8">
				{data?.lessons.map(({ id, ...rest }) => (
					<Lesson key={id} {...rest} />
				))}
			</div>
		</aside>
	);
}
