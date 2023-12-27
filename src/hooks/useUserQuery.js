import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchUser = async () => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return await response.json();
};

// 기존
const deleteUser = async (num) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		method: 'DELETE',
	});
	return await response.json();
};

// 데이터 목록 호출 커스텀 훅
export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, { refetchOnMount: false, refetchOnWindowFocus: false, cacheTime: 1000 * 20, staleTime: 1000 * 0 });
};

// 기존 서버 데이터 업데이트 함수
export const updateUser = async ([userName, num]) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		method: 'PATCH',
		body: JSON.stringify({
			name: userName,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const result = await response.json();
	console.log(result);
	return result;
};

// 데이터 변경 커스텀 훅
export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation(updateUser, {
		onSuccess: (args) => {
			queryClient.setQueryData(['users', args.id], args);
		},
	});
};
