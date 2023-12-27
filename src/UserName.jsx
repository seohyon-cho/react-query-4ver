import { useUserQuery } from './hooks/useUserQuery';

export default function UserName() {
	const { isSuccess, data } = useUserQuery();

	return (
		<div className='UserName'>
			<h1>User Name</h1>

			<ul>{isSuccess ? data.map((user) => <li key={user.id}>{user.name}</li>) : <p>Loading...</p>}</ul>
		</div>
	);
}
