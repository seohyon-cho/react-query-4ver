import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route } from 'react-router-dom';
import Menu from './Menu';
import Main from './Main';
import UserName from './UserName';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Menu />
			<Route exact path='/' component={Main} />
			<Route path='/name' component={UserName} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
