import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../utills/api";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  useEffect(() => {
    getArticle(article_id).then((result) => {
      console.log(result);
      setArticle(result);
    });
  }, [article_id]);
  //   console.log(article)

  return (
    <div className="single-article">
      <h1>Article</h1>
      <div>
        <h2> {article.title} </h2>
        <h1> {article.topic} </h1>
        <h2> {article.author}</h2>
        <p> {article.body} </p>
        <div className="article-details">
          <p>Created: {article.created_at}</p>
          <p>Votes: {article.votes}</p>
          <p>Comment Count: {article.comment_count}</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
