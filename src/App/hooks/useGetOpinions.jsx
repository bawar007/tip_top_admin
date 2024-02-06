import { useState, useEffect } from "react";
import axios from "axios";

const useGetOpinions = (HOST, API_KEY) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${HOST}/opinions`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Cache-Control": "no-cache",
          },
        });
        const queued = response.data.filter((item) => item.status === "queued");
        const accepted = response.data.filter(
          (item) => item.status === "accepted"
        );
        setData({
          accepted: accepted,
          queued: queued,
        });

        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    // Po zmianie klucza pamięci podręcznej, hook użyje nowych danych do renderowania komponentu.
    fetchData();
  }, [API_KEY, HOST]);

  return { loading, data, error, setData };
};

export default useGetOpinions;
