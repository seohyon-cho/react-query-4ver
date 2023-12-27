import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchUser = async () => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return await response.json();
};

// 기존
const deleteUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`, {
		method: 'DELETE',
	});
	return await response.json();
};

// 데이터 목록 호출 커스텀 훅
export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, { refetchOnMount: false, refetchOnWindowFocus: false, cacheTime: 1000 * 20, staleTime: 1000 * 0 });
};

// 인수로 순번을 받아서, 해당 순번의 데이터를 삭제하는 커스텀 훅
export const useDeleteQuery = () => {
	// 기존에 생성한 queryClient 인스턴스를 호출.
	// 해당 queryClient 인스턴스에서 활용할 수 있는 prototype method인 setQueryData 라는 서버 데이터 변경 요청 값을 등록하는 함수를 가져올 수 있음.
	const queryClient = useQueryClient();
	// useMutation은, 첫 번째 인수로는 비동기 데이터 변경 함수, 두 번째 인수로는 옵션 설정 객체가 들어가야 함.
	// useMutation(비동기데이터 변경함수, 옵션설정객체 {onSuccess: mutate요청이 성공적으로 수행되면 연결될 핸들러 함수})
	// useMutation 훅이 deleteUser라는 내부 fetching 함수를 호출해서 서버 데이터를 변경 요청.
	return useMutation(deleteUser, {
		// 서버 데이터 변경 성공 시, 변경된 서버 데이터 값을 다시 고유의 queryKey로 등록해서 react-query가 비동기 데이터를 관리하게 함.
		onSuccess: (args) => {
			queryClient.setQueryData(['users', args.id], args);
		},
	});
};
