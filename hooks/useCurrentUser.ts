import useSWRImmutable from "swr/immutable";
import { fetcher } from "../utils/swr/fetcher";

export const useCurrentUser = () => {
  const { data, error, mutate } = useSWRImmutable("/api/user", fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
  };
};
