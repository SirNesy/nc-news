import { useEffect, useState } from "react";
import { getArticles } from "../utills/api";
import { Link } from "react-router-dom";
// import Article from "./Article";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
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
