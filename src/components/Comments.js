import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/User";
import { getComments, postComment } from "../utills/api";

function Comments() {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");

  const handleChangeComment = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    postComment(article_id, user.username, comment).then((result) => {
      setComments((current_comments) => {
        return [{ ...result, ...current_comments }];
      });
    });
    setComment("");

    console.log(comments);
  };
  useEffect(() => {
    getComments(article_id).then((result) => {
      setComments(result);
      setLoading(false);
    });
  }, [article_id, comments]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <ul>
      <form onSubmit={handleSubmitComment}>
        <label>
          <input placeholder="Enter comment" onChange={handleChangeComment} />
          <button type="submit">Add Comment</button>
        </label>
      </form>
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
