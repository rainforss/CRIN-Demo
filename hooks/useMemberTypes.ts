import useSWR from "swr";
import { DynamicsMemberType } from "../types/dynamics-365/common/types";
import { fetcher } from "../utils/swr/fetcher";

//Custom data fetching hook to be used in pages, no useEffect needed
export const useMemberTypes = () => {
  const { data, error, mutate } = useSWR(`/api/options/membertype`, fetcher);
  return {
    memberTypes: data as DynamicsMemberType[],
    isMemberTypeLoading: !error && !data,
    isMemberTypeError: error,
    mutateMemberTypes: mutate,
  };
};
