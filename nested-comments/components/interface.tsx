export type Comment = {
  id: number;
  text: string;
  dateModified: string;
  replies: Comment[];
  showReply?: boolean;
  showAdd?: boolean;
  showEdit?: boolean
};
export type operation='add'|'showAdd'|'edit'|'showEdit'|'showReply';
export type getCommentLength = (list: Comment[], length?: number) => number;

export type addComment = (newComment: string, parentId?: number) => void

export type CommentFC=React.FC<{addCommentHanlder:addComment, comments: Comment[], }>
