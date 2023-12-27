import { useUserQuery } from './hooks/useUserQuery';

export default function UserAddress() {
	const { isSuccess, data } = useUserQuery(2);

	return (
		<div className='UserAddress'>
			<h1>UserAddress</h1>
			<h2>address:{isSuccess && data.address.street}</h2>
		</div>
	);
}
