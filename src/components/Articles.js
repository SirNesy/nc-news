import { useEffect, useState } from "react";
import { getArticles } from "../utills/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((data) => setArticles(data));
  }, []);

  return (
    <div>
      <ul className="articles">
        {articles.map((article) => {
          return (
            <li key={article.article_id} className="article">
              <h2 className="article-title">{article.title}</h2>
              <h2 className="article-topic">{article.topic}</h2>
              <h4 className="article-author"> Author: {article.author}</h4>
              <p className="article.body">{article.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Articles;
