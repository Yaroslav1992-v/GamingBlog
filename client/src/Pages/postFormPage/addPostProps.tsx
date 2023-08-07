import {
  PostData,
  contentType,
  formsProps,
} from "../../Hoc/hooks/usePost.types";

export interface formsPlusProps {
  postData: PostData;
  forms: formsProps[];
  handleData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChange: onChange;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cancelForm: (value: contentType, id: number) => void;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  formText: "Create Post" | "Edit Post";
}
export interface formActions {
  action: ({ contentName, id, value }: formsProps) => void;
  num: number;
  activateFileField: ({ ...props }) => void;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PostTextAreaProps extends formsProps {
  onChange: onChange;
  error?: string;
}
export type onChange = ({
  target,
}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export interface AddImageProps {
  image: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
export interface tagsInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
}
