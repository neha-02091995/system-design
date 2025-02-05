import { useState } from "react";
import Newcomment from "./Newcomment";
import { Comment } from "./interface";
import "./style.css";

const EditComment = ({ text, id, operationFn, setComments }) => {
  const [modifiedComment, setModifiedComment] = useState(text);
  const editCommentHandler = () => {
    const modifiedItem: Omit<Comment, "replies"> = {
      id,
      text: modifiedComment,
      dateModified: new Date().toISOString(),
    };
    setComments(operationFn(id, "edit", modifiedItem));
  };
  return (
    <div className="new-comment-conatiner">
      <textarea
        rows={2}
        cols={80}
        value={modifiedComment}
        onChange={(e) => setModifiedComment(e.target.value)}
      />
      <button className="new-comment add-comment" onClick={editCommentHandler}>
        Edit
      </button>
    </div>
  );
};

const Comments = ({
  addCommentHanlder,
  comments,
  setComments,
  deleteCommentHandler,
  operationFn,
}) => {
  const showAddCommentHandler = (id: number) => {
    const updatedComments = operationFn(id, "showAdd");
    setComments(updatedComments);
  };

  const handleShowReply = (id: number) => {
    setComments(operationFn(id, "showReply"));
  };

  const handleShowEdit = (id: number) => {
    setComments(operationFn(id, "showEdit"));
  };

  return (
    <div className="comment-section">
      {comments.map((item: Comment) => {
        const { id, text, dateModified, replies, showReply } = item;
        return (
          <>
            <div key={id} className="comment-item">
              {text}
              <br />
              <div className="date-modified">{dateModified}</div>
              {item.showAdd ? (
                <Newcomment
                  parentId={id}
                  addCommentHanlder={addCommentHanlder}
                />
              ) : (
                <button
                  className="show-replies"
                  onClick={() => showAddCommentHandler(id)}
                >
                  Add Comment
                </button>
              )}

              {replies.length ? (
                <button
                  className="show-replies"
                  onClick={() => handleShowReply(id)}
                >
                  {showReply ? "HideReplies" : "Show Replies"}
                </button>
              ) : null}

              <button
                className="show-replies"
                onClick={() => deleteCommentHandler(id)}
              >
                Delete
              </button>
              {item.showEdit ? (
                <EditComment text={text} id={id} operationFn={operationFn} setComments={setComments}/>
              ) : (
                <button
                  className="show-replies"
                  onClick={() => handleShowEdit(id)}
                >
                  Edit
                </button>
              )}
              {showReply && replies.length ? (
                <div className="reply-section">
                  <Comments
                    comments={replies}
                    addCommentHanlder={addCommentHanlder}
                    setComments={setComments}
                    handleShowReply={handleShowReply}
                    deleteCommentHandler={deleteCommentHandler}
                    operationFn={operationFn}
                  />
                </div>
              ) : null}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Comments;
