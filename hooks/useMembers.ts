import useSWR from "swr";
import { MemberSearchValue } from "../forms/MemberSearchForm";
import { Member } from "../types/dynamics-365/common/types";
import { fetcher } from "../utils/swr/fetcher";

//Custom data fetching hook to be used in pages, no useEffect needed
export const useMembers = (searchTerm: MemberSearchValue) => {
  const queryString = `?keyword=${searchTerm.searchString}&memberType=${searchTerm.memberType}&techTheme=${searchTerm.techTheme}`;
  const { data, error, mutate } = useSWR(`/api/members${queryString}`, fetcher);
  return {
    members: data as Member[],
    isMemberLoading: !error && !data,
    isMemberError: error,
    mutateMembers: mutate,
  };
};
