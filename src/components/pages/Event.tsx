import { Header } from '../Header';
import { Video } from '../Video';
import { SideBar } from '../SideBar';
import { useParams } from 'react-router-dom';

export function Event() {
	const { slug } = useParams<{ slug: string }>();
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex flex-1">
				{slug ? <Video /> : <div className="flex-1"></div>}
				<SideBar />
			</main>
		</div>
	);
}
