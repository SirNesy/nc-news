import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, patchDecVotes, patchIncVotes } from "../utills/api";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getArticle(article_id).then((result) => {
      setArticle(result);
      setLoading(false);
    });
  }, [article_id]);

  function handleIncVotes() {
    // console.log("button clicked");
    setArticle((current_article) => {
      return { ...current_article, votes: current_article.votes + 1 };
    });
    patchIncVotes(article_id).catch((err) => {
      setArticle((current_article) => {
        return { ...current_article, votes: current_article.votes - 1 };
      });
      setErr(
        <span className="err">Something went wrong, please try again </span>
      );
    });
    setVoted(true);
  }

  function handleDecVotes() {
    setArticle((current_article) => {
      return { ...current_article, votes: current_article.votes - 1 };
    });
    patchDecVotes(article_id).catch((err) => {
      setArticle((current_article) => {
        return { ...current_article, votes: current_article.votes + 1 };
      });
      setErr(
        <span className="err">Something went wrong, please try again </span>
      );
    });
    setVoted(false);
  }

  return loading ? (
    <h2>Loading...</h2>
  ) : err ? (
    <p>{err}</p>
  ) : (
    <div className="single-article">
      <h2 className="article-header">ARTICLE</h2>
      <div>
        <h2 className="article-title"> {article.title} </h2>
        <h1 className="article-topic"> {article.topic} </h1>
        <h2 className="article-author"> {article.author}</h2>
        <p> {article.body} </p>
        <div className="article-details">
          <p>Created: {article.created_at}</p>
          <p className="btn">
            Votes: {article.votes}{" "}
            <span
              className="button-inc"
              onClick={!voted ? handleIncVotes : handleDecVotes}
            >
              VOTE
            </span>
          </p>
          <p>Comment Count: {article.comment_count}</p>
        </div>
      </div>
      <Link to={`/articles/${article_id}/comments`}>Comments</Link>
    </div>
  );
};

export default Article;
