import * as React from "react";
import useFetch from "../hooks/fetchHook";

// Define the shape of the data you're fetching
interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchComp: React.FC = () => {
  // Use the useFetch hook and specify the type as Post[]
  const { data, loading, error } = useFetch<Post[]>({
    url: "https://jsonplaceholder.typicode.com/posts",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data &&
        data.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default FetchComp;
