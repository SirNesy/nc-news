import { useEffect, useState } from "react";
import { getArticles } from "../utills/api";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortValue, setSortValue] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [searchParams, setSearchParams] = useSearchParams();
  (searchParams.get("sort_by"));

  useEffect(() => {
    getArticles(sortValue, order).then((data) => {
      setArticles(data);
      setLoading(false);
      setSearchParams({ sort_by: sortValue, order: order });
    });
  }, [sortValue, order, setSearchParams]);

  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    setSortValue(e.target.value);
    // console.log(sortValue);
  }

  function handleOrderChange(event) {
    event.preventDefault();
    setOrder(event.target.value);
  }

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <div className="query">
        <form>
          <span> SORT BY </span>
          <select className="select-dropdown" onChange={handleChange}>
            <option value={"created_at"}>Date</option>
            <option value={"comment_count"}>Comment Count</option>
            <option value={"votes"}>Votes</option>
          </select>
        </form>
        <form className="order">
          <select className="order-dropdown" onChange={handleOrderChange}>
            <option value={"asc"}>ASCENDING</option>
            <option value={"desc"}> DESCENDING</option>
          </select>
        </form>
      </div>

      <ul className="articles">
        {articles.map(({ article_id, title, topic, author, body }) => {
          return (
            <li key={article_id} className="article">
              <Link to={`/articles/${article_id}`}>
                <h2 className="article-title">{title}</h2>
              </Link>
              <h2 className="article-topic">{topic}</h2>
              <h4 className="article-author"> Author: {author}</h4>
              <p className="article.body">{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Articles;
