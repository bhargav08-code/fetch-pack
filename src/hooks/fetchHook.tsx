import { useState, useEffect } from "react";

// Define a type for the hook's props
interface UseFetchProps {
  url: string; // Expecting a URL as a string
}

// Define a type for the hook's return value
interface UseFetchResult<T> {
  data: T | null; // The fetched data, can be of any type or null
  loading: boolean; // Loading state
  error: string | null; // Error message, if any
}

// Make useFetch a generic hook that takes a type parameter T
const useFetch = <T,>({ url }: UseFetchProps): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null); // State for data
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const result: T = await response.json(); // Specify the type of result
        setData(result); // Set fetched data
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Set error message if available
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData(); // Call the fetchData function
  }, [url]); // Re-run effect if url changes

  return { data, loading, error }; // Return data, loading state, and error
};

export default useFetch;
