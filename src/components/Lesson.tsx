import clsx from 'clsx';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';

interface Props {
	title: string;
	slug: string;
	availableAt?: string;
	type: 'class' | 'live';
}

export default function Lesson({ title, slug, availableAt, type }: Props) {
	const { slug: slugParam } = useParams();

	const date = new Date(availableAt as string);
	const isLessonAvailable = isPast(date);
	const availableDateFormatted = format(date, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
		locale: ptBR,
	});

	const isActiveLesson = slug === slugParam;

	return (
		<Link to={`/event/lesson/${slug}`} className="group">
			<span className="text-gray-300">{availableDateFormatted}</span>

			<div
				className={clsx(
					{ 'bg-green-500 border border-transparent': isActiveLesson },
					'border border-gray-500 rounded p-4 mt-2 group-hover:border-green-500',
				)}
			>
				<header className="flex items-center justify-between">
					{isLessonAvailable ? (
						<span
							className={clsx(
								{ 'text-white': isActiveLesson, 'text-blue-500': !isActiveLesson },
								'text-sm font-medium flex items-center gap-2',
							)}
						>
							<CheckCircle size="20" />
							Conteúdo liberado
						</span>
					) : (
						<span className="text-sm text-orange-500 font-medium flex items-center gap-2">
							<Lock size="20" />
							Em breve
						</span>
					)}

					<span
						className={clsx(
							{ 'border-white': isActiveLesson, 'border-green-300': !isActiveLesson },
							'text-xs px-2 py-[2px] border rounded text-white font-bold uppercase',
						)}
					>
						{type === 'live' ? 'Ao vivo' : 'Aula prática'}
					</span>
				</header>

				<strong
					className={clsx(
						{ 'text-white': isActiveLesson, 'text-gray-200': !isActiveLesson },
						'mt-5 block',
					)}
				>
					{title}
				</strong>
			</div>
		</Link>
	);
}
