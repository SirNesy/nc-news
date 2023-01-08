import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/User";
import { deleteComment, getComments, postComment } from "../utills/api";


function Comments() {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [inputComment, setComment] = useState("");
  const [notification, setNotification] = useState("");
  const [commentID, setCommentID] = useState(null);

  const handleDelete = (index, commentId, commentAuthor) => {
    const newComment = [...comments];
    console.log(commentAuthor);
    if (!user.username) {
      alert("Please Login to delete your comment!");
    } else if (user.username !== commentAuthor) {
      alert("You can only delete your comment!");
    } else {
      newComment.splice(index, 1);
      setComment(newComment);
      setCommentID(commentId);
    }

  };
  useEffect(() => {
    deleteComment(commentID).then((result) => {
      // alert("Comment deleted")
      return result;
    });
  }, [commentID]);


  const handleChangeComment = (e) => {
    const val = e.target.value;
    setComment(val);
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (inputComment.trim() === "") {
      alert("comment required");
    }
    if (!user.username) {
      alert("Please login");
    } else {
      setNotification("Comment submitted");
      postComment(article_id, user.username, inputComment).then((result) => {
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
          value={inputComment}
          required
        />
        <button type="submit">Add Comment</button>
        
      </form>
      <p className="notify">{notification}</p>
      {comments.map((comment, index) => {
        const commentId = comment.comment_id;
        const commentAuthor = comment.author;
        return (
          <li className="comment" key={commentId}>
            <h3 className="comment-author">{commentAuthor}</h3>
            <p className="comment-body"> {comment.body} </p>
            <div className="comment-details">
              <p className="date-created">{comment.created_at}</p>
              <p className="comment-votes">{comment.votes}</p>
            </div>
            <button
              onClick={() => handleDelete(index, commentId, commentAuthor)}
            >
              DELETE
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
