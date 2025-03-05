import { Screenshot } from "../entities/Screenshot";
import { APIClientFetch } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";

const UseScreenshots = (gameId: number) => {
  const apiCliennt = new APIClientFetch<Screenshot>(
    `/games/${gameId}/screenshots`
  );

  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: () => apiCliennt.getAll(),
  });
};

export default UseScreenshots;
