export interface CommentFieldProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export interface ReplyComment {
  name: string;
  commentId: string;
  userId: string;
}
export interface CommentEditProps {
  data: string;
  handleEdit: () => void;
  commentId: string;
}
