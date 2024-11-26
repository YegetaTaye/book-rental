import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDynamicQuery = ({
  queryKey,
  queryFn,
  staleTime = 60 * 1000,
  retry = 3,
  onError,
}) =>
  useQuery(queryKey, queryFn, {
    staleTime,
    retry,
    onError,
  });

export default useDynamicQuery;
