export interface InputProps {
  type: string;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
  error?: string | null;
  value?: string;
}
//e: React.ChangeEvent<HTMLInputElement>
