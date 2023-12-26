import { useQuery } from '@tanstack/react-query';

const fetchUser = async ({ queryKey }) => {
	console.log(queryKey);
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	return await response.json();
};

export const useUserQuery = (num) => {
	// useQuery에 첫 번째 인수로 넣는 값은 무조건 fetching함수(여기서는 fetchUser)로 전달됨.
	// useQuery에서는 queryKey가 동일하면 같은 데이터라고 인지하기 때문에, re-fetching 처리를 하지 않음.
	return useQuery(['users', num], fetchUser, { refetchOnMount: false, refetchOnWindowFocus: false, cacheTime: 1000 * 5, staleTime: 1000 * 0 });
};

/*
  fresh : 서버데이터를 최신으로 인식하는 상태 (refetch 필요 없는 상태)
  stale : 서버데이터를 오래된 상태로 인식하는 상태 (refetch 필요한 상태)
  inactive : 서버데이터가 더이상 해당 컴포넌트에서 활용되지 않는 상태 
  cacheTime : inactive 상태에서 어느 정도의 시간까지 데이터를 유지시킬지에 대한 시간 설정값 (default : 1000 * 60 * 5ms (5분))
  staleTime : 처음 data fetching후, 얼마 뒤에 fresh -> stale 로 변경할지에 대한 시간 설정 값 (default : 0ms)
*/
