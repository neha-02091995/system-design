import {  getCommentLength } from "./interface";


export const getCommentLengthFn: getCommentLength = (list, length = 0) => {
  list.forEach((item) => {
    if (Array.isArray(item)) {
      length += getCommentLengthFn(item, length);
    } else {
      length += 1;
    }
  });
  return length;
}
