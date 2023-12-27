import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 특정 순번의 서버 데이터를 불러오는 fetching 함수이자 커스텀 훅
// 데이터를 가져오기만 하므로 useQuery 사용
const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	return await response.json();
};

// 순서 (2) : 컴포넌트에서 해당 훅 호출 시, 자동으로 고유 쿼리를 등록하면서 num값을 전덜하며 fetching 함수를 호출함.
// 반환된 데이터 값이 옵션 값에 따라 캐싱 처리 되면서 반환됨.
// 데이터 목록 호출 커스텀 훅
export const useUserQuery = (num) => {
	return useQuery(['users', num], fetchUser, { refetchOnMount: true, refetchOnWindowFocus: false, cacheTime: 1000 * 20, staleTime: 1000 * 0 });
};

// 특정 순번의 서버 데이터를 변경하는 fetching 함수이자 커스텀 훅
// 데이터를 변경 요청까지 하므로 useMutation 사용
// 순서 (6) : 해당 함수(updateUser)가 호출되면, num순번의 데이터 객체에서 name값을, 같이 전달된 userName 값으로 서버데이터를 실제 변경 처리 한 뒤 반환함.
export const updateUser = async ([userName, num]) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		method: 'PATCH',
		body: JSON.stringify({ name: userName }),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	});
	const result = await response.json();
	return result;
};

// 데이터 변경 커스텀 훅
export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	// 순서 (5) : mutate 메서드 호출 시, 아래 구문이 자동적으로 호출되면서, 등록된 updateUser 함수를 호출.
	return useMutation(updateUser, {
		// 순서 (7) : updateUser 함수로 서버 값 변경이 성공적으로 이루어지면, 해당 값을 인수로 받아 고유 queryKey를 생성하면서 캐싱처리된 값을 queryClient로 전역 관리함.
		onSuccess: (args) => {
			queryClient.setQueryData(['users', args.id], args);
		},
	});
};
