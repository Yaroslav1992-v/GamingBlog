export interface InputProps {
  type: string;
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  error?: string | null;
  value?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface AvatarFieldProps {
  id: string;
  url?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
//e: React.ChangeEvent<HTMLInputElement>
export interface TextAreaProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name: string;
}
