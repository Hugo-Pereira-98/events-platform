import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { Link } from 'react-router-dom';

interface Props {
	title: string;
	slug: string;
	availableAt: string;
	type: 'class' | 'live';
}

export default function Lesson({ title, slug, availableAt, type }: Props) {
	const date = new Date(availableAt);
	const isLessonAvailable = isPast(date);
	const availableDateFormatted = format(date, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
		locale: ptBR,
	});

	return (
		<Link to={`/event/lesson/${slug}`} className="group">
			<span className="text-gray-300">{availableDateFormatted}</span>

			<div className="border border-gray-500 rounded p-4 mt-2 group-hover:border-green-500">
				<header className="flex items-center justify-between">
					{isLessonAvailable ? (
						<span className="text-sm text-blue-500 font-medium flex items-center gap-2">
							<CheckCircle size="20" />
							Conteúdo liberado
						</span>
					) : (
						<span className="text-sm text-orange-500 font-medium flex items-center gap-2">
							<Lock size="20" />
							Em breve
						</span>
					)}

					<span className="text-xs px-2 py-[2px] border border-green-300 rounded text-white font-bold uppercase">
						{type === 'live' ? 'Ao vivo' : 'Aula prática'}
					</span>
				</header>

				<strong className="text-gray-200 mt-5 block">{title}</strong>
			</div>
		</Link>
	);
}
