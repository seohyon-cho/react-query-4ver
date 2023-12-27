import { useState } from 'react';
import { useUpdateUser, useUserQuery } from './hooks/useUserQuery';

export default function UserName() {
	const { isSuccess, data } = useUserQuery();
	const updateUser = useUpdateUser();
	const [UserName, setUserName] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		updateUser.mutate([UserName, 2]);
	};

	console.log(data);

	return (
		<div className='UserName'>
			<h1>User Name</h1>

			<form onSubmit={handleSubmit}>
				<input type='text' value={UserName || ''} onChange={(e) => setUserName(e.target.value)} />
			</form>

			<ul>{isSuccess ? data.map((user) => <li key={user.id}>{user.name}</li>) : <p>Loading...</p>}</ul>
		</div>
	);
}
