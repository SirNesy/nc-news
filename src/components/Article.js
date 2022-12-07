import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "../utills/api";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getArticle(article_id).then((result) => {
      setArticle(result);
      setLoading(false);
    });
  }, [article_id]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="single-article">
      <h2 className="article-header">ARTICLE</h2>
      <div>
        <h2 className="article-title"> {article.title} </h2>
        <h1 className="article-topic"> {article.topic} </h1>
        <h2 className="article-author"> {article.author}</h2>
        <p> {article.body} </p>
        <div className="article-details">
          <p className="article-detail">Created: {article.created_at}</p>
          <p className="article-detail">Votes: {article.votes}</p>
          <p className="article-detail">
            Comment Count: {article.comment_count}
          </p>
        </div>
      </div>
      <Link to={`/articles/${article_id}/comments`}>Comments</Link>
    </div>
  );
};

export default Article;
