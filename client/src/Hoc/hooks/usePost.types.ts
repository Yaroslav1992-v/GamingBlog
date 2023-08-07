import { Tags } from "../../store/types";

export interface PostContextValue {
  errors: PostErrors | undefined;
  imageError: ImgError;
  postData: PostData;
  forms: formsProps[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleForms: ({ id, contentName, value }: formsProps) => void;
  activateField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    file?: File
  ) => void;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cancelForm: (value: contentType, id: number) => void;
  setForms: (data: formsProps[]) => void;
  setPostData: (data: PostData) => void;
  checkForErrors: () => boolean;
  searchQuery: string;
  searchQueries: string[];
  handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  filteredTags: Tags[];
  handleTags: (tag: Tags | string) => void;
  setTags: (tags: Tags[]) => void;
  tags: Tags[];
  removeTag: (tagName: string) => void;
}

export interface PostErrors {
  mainTitle?: string;
  mainImage?: string;
  text?: string;
  tags?: string;
}
export interface formsProps {
  contentName: contentType;
  id: number;
  value: string | File;
}
export interface contentData extends Omit<formsProps, "value"> {
  value: string;
}
export interface formsPlusProps {
  postData: PostData;
  forms: formsProps[];
  handleData: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChange: onChange;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cancelForm: (value: contentType, id: number) => void;
}
export interface formActions {
  action: ({ contentName, id, value }: formsProps) => void;
  num: number;
  activateFileField: ({ ...props }) => void;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export type contentType = "text" | "image" | "quote" | "title" | "mainTitle";

export interface PostData {
  mainTitle: string;
  mainImage: File | "" | string;
}
export interface PostContent {
  name: contentType;
  value: string;
}
export interface PostTextAreaProps extends formsProps {
  onChange: onChange;
}
export type onChange = ({
  target,
}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export interface AddImageProps {
  image: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface ImgError {
  mainImage: string;
  image: string;
}
