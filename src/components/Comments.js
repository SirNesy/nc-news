import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../utills/api";

function Comments() {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then((result) => {
      setComments(result);
      setLoading(false);
    });
  }, [article_id]);
  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <ul>
      {comments.map((comment) => {
        return (
          <li className="comment" key={comment.comment_id}>
            <h3 className="comment-author">{comment.author}</h3>
            <p className="comment-body"> {comment.body} </p>
            <div className="comment-details">
              <p className="date-created">{comment.created_at}</p>
              <p className="comment-votes">{comment.votes}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
