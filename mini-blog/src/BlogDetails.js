import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    data: blogs,
    error,
    isLoading,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const handelDelete = () => {
    fetch("http://localhost:8000/blogs/" + blogs.id, {
      method: "DELETE",
    }).then(() => {
      console.log("del");
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isLoading && <div>Loading....</div>}
      {error && <div>{error}</div>}
      {blogs && (
        <article>
          <h2>{blogs.title}</h2>
          <p>Written by {blogs.author}</p>
          <div>{blogs.body}</div>
          <button onClick={handelDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
