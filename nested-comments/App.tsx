import { useEffect, useState } from "react";
import Comments from "./components/comments";
import Newcomment from "./components/Newcomment";
import { getCommentLengthFn } from "./components/util";
import { Comment, addComment, operation } from "./components/interface";
import * as commentData from "./db.json";

function App() {
  const [comments, setComments] = useState(commentData.comments);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(getCommentLengthFn(comments));
  }, [comments]);

  

  const addCommentHanlder: addComment = (newComment, parentId) => {
    if (parentId === undefined || parentId === null) {
      setComments([
        ...comments,
        {
          id: length + 1,
          text: newComment,
          dateModified: new Date().toDateString(),
          replies: [],
          showReply: false,
        },
      ]);
    } else {
      const modifiedItem = {
        id: length,
        text: newComment,
        dateModified: new Date().toDateString(),
        replies: [],
        showReply: false,
      };
      setComments(operationFn(parentId, "add", modifiedItem));
    }
  };

  const deleteComment = (id: number, list: Comment[] = comments): Comment[] => {
    let index = list.findIndex((item) => item.id === id);
    if (index != -1) {
      list.splice(index, 1);
      return list;
    } else {
      return list.map((item) => {
        if (item.replies.length) {
          return {
            ...item,
            replies: deleteComment(id, item.replies),
          };
        } else {
          return item;
        }
      });
    }
  };

  const deleteCommentHandler = (id: number) => {
    setComments(deleteComment(id));
  };

  const operationFn = (
    parentId: number,
    operation: operation,
    modifiedItem?: Comment,
    list: Comment[] = comments
  ): Comment[] => {
    return list.map((item) => {
      if (item.id === parentId) {
        if (operation === "add" && modifiedItem) {
          item.replies.push(modifiedItem);
          item.showAdd=false;
          item.showReply=true
          return item;
        }
        if (operation === "showAdd") {
          item.showAdd=true;
          return item
        }
        if(operation==='showReply'){
          item.showReply=!item.showReply
        }
        if(operation==='showEdit'){
          item.showEdit=true;
        }
        if(operation==="edit" && modifiedItem){
          item={...item,...modifiedItem, showEdit: false};
          return item
        }

      } else if (item.replies.length) {
        item.replies = operationFn(parentId,  operation, item, item.replies);
        return item;
      }
      return item;
    });
  };

  return (
    <div>
      <h1>Nested Comments</h1>
      <Newcomment addCommentHanlder={addCommentHanlder} />
      <Comments
        addCommentHanlder={addCommentHanlder}
        comments={comments}
        setComments={setComments}
        deleteCommentHandler={deleteCommentHandler}
        operationFn={operationFn}
      />
    </div>
  );
}

export default App;
