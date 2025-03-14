import { useEffect, useState } from "react";
import { minimumLoadingTime } from "@/lib/mininumLoadingTime";

const useFirstLoaded = () => {
  const [isFirstLoaded, setFirstLoaded] = useState<boolean>(false);

  useEffect(() => {
    setFirstLoaded(true);
    const loading = async () => {
      try {
        await minimumLoadingTime();
      } catch (error) {
        console.error("", error);
      } finally {
        setFirstLoaded(false);
      }
    };
    loading();
  }, []);

  return { isFirstLoaded };
};

export default useFirstLoaded;
