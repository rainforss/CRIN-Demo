import useSWR from "swr";
import { DynamicsTheme } from "../types/dynamics-365/common/types";
import { fetcher } from "../utils/swr/fetcher";

//Custom data fetching hook to be used in pages, no useEffect needed
export const useTechThemes = () => {
  const { data, error, mutate } = useSWR(`/api/tech-themes`, fetcher);
  return {
    techThemes: data as DynamicsTheme[],
    isTechThemeLoading: !error && !data,
    isTechThemeError: error,
    mutateTechThemes: mutate,
  };
};
