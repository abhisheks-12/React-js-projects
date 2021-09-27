import { useState, useEffect } from "react";
// import AbortController from "abort-controller";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data");
          }

          return res.json();
        })
        .then((data) => {
          // console.log(data)
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
            setIsLoading(false);
          }
        });
    }, 1000);

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
// "http://localhost:8000/blogs"
