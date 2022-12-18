import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleByTopics, getTopics } from "../utills/api";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articles, setArticle] = useState([]);
  const { topic } = useParams();
  // console.log(topic);
  useEffect(() => {
    getTopics().then((result) => {
      setTopics(result);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getArticleByTopics(topic).then((result) => {
      setArticle(result);
    });
  }, [topic]);

  return loading ? (
    <p>loading....</p>
  ) : (
    <div>
      <ul className="topic-nav">
        {topics.map((topic, i) => {
          return (
            <span className="topic" key={i}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </span>
          );
        })}
      </ul>
      <ul className="topic-list">
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                <h2 className="article-title">{article.title}</h2>
              </Link>
              <h2 className="article-topic">{article.topic}</h2>
              <h4 className="article-author"> Author: {article.author}</h4>
              <p className="article.body">{article.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Topics;
