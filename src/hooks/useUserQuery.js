import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	return await response.json();
};

export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, { refetchOnMount: false, refetchOnWindowFocus: false, cacheTime: 1000 * 5 });
};

/*
  fresh : 서버데이터를 최신으로 인식하는 상태 (refetch 필요 없는 상태)
  stale : 서버데이터를 오래된 상태로 인식하는 상태 (refetch 필요한 상태)
  inactive : 서버데이터가 더이상 해당 컴포넌트에서 활용되지 않는 상태 
  cacheTime : inactive 상태에서 어느 정도의 시간까지 데이터를 유지시킬지에 대한 시간 설정값 (default : 1000 * 60 * 5ms (5분))
  staleTime : 처음 data fetching후, 얼마 뒤에 fresh -> stale 로 변경할지에 대한 시간 설정 값 (default : 0ms)
*/
