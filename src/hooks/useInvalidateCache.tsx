import { useQueryClient } from '@tanstack/react-query';

const useInvalidateUserCache = () => {
  const queryClient = useQueryClient();

  const invalidateUserCache = () => {
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
  };

  return invalidateUserCache;
};

export default useInvalidateUserCache;
