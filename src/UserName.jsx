import { useState } from 'react';
import { useUpdateUser, useUserQuery } from './hooks/useUserQuery';

export default function UserName() {
	// 순서 (1) : 해당 컴포넌트 마운트 시, react-query 훅으로 2번째 데이터를 호출하고 자동으로 캐싱 처리.
	const { isSuccess, data } = useUserQuery(2);
	const updateUser = useUpdateUser();
	const [UserName, setUserName] = useState('');
	// 순서 (4) : 폼 전송 이벤트 발생 시, 폼의 input에 있는 변경할 사용자 이름과 변경할 데이터 순번을 배열로 묶어서, update 커스텀 훅으로 활성화시킨 useMutation 객체를 가져와서, mutate 메서드에 인수로 전달해줌.
	const handleSubmit = (e) => {
		e.preventDefault();
		updateUser.mutate([UserName, 2]);
	};

	return (
		<div className='UserName'>
			<h1>User Name</h1>

			<form onSubmit={handleSubmit}>
				<input type='text' value={UserName || ''} onChange={(e) => setUserName(e.target.value)} />
			</form>
			{/* 순서 (3) : useQuery 훅에 의해서 캐싱 반환된 데이터 값 출력 */}
			<p>{isSuccess && data.name}</p>
		</div>
	);
}
