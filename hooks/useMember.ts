import useSWR from "swr";
import { Member } from "../types/dynamics-365/common/types";
import { fetcher } from "../utils/swr/fetcher";

//Custom data fetching hook to be used in pages, no useEffect needed
export const useMember = (id: string) => {
  const { data, error, mutate } = useSWR(`/api/members/${id}`, fetcher);
  return {
    member: data as Member,
    isMemberLoading: !error && !data,
    isMemberError: error,
    mutateMember: mutate,
  };
};
