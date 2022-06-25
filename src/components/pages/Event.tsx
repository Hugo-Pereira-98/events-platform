import { Header } from '../Header';
import { Player } from '../Player';
import { SideBar } from '../SideBar';

export function Event() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex flex-1'>
				<Player />
				<SideBar />
			</main>
		</div>
	);
}
