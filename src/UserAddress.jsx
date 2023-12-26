import { useUserQuery } from './hooks/useUserQuery';

export default function UserAddress() {
	const result = useUserQuery(2);
	console.log(result);

	return (
		<div className='UserAddress'>
			<h1>UserAddress</h1>
		</div>
	);
}
