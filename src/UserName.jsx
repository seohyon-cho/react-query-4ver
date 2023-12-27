import { useState } from 'react';
import { useUserQuery } from './hooks/useUserQuery';

export default function UserName() {
	const [Num, setNum] = useState(1);
	// 커스텀 훅은 핸들러 함수나 useEffect 안에 넣을 수 없음.
	const { isSuccess, data } = useUserQuery(Num);

	return (
		<div className='UserName'>
			<h1>UserName</h1>
			<button onClick={() => setNum(1)}>변경1</button>
			<button onClick={() => setNum(2)}>변경2</button>

			<h2>{isSuccess && data.name}</h2>
		</div>
	);
}
