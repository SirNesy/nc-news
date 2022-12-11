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
  // const [sending, setSending] = useState(true)
  const [notification, setNotification] = useState("");

  const handleChangeComment = (e) => {
    const val = e.target.value;
    setComment(val);
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      alert("comment required");
    }
    if (!user.username) {
      alert("Please login");
    } else {
      setNotification("Comment submitted");
      postComment(article_id, user.username, comment).then((result) => {
        setComments((current_comments) => {
          return [{ ...result, ...current_comments }];
        });
      });
      setComment("");
    }
  };
  useEffect(() => {
    getComments(article_id).then((result) => {
      setComments(result);
      setLoading(false);
      // setSending(false);
      setNotification("");
    });
  }, [article_id, comments]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <ul>
      <form onSubmit={handleSubmitComment}>
        <input
          className="input-field"
          placeholder="Enter comment"
          onChange={handleChangeComment}
          value={comment}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
      <p className="notify">{notification}</p>
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
