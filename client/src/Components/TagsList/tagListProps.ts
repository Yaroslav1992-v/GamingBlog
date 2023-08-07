import { Tags } from "../../store/types";

export interface tagListProps {
  tags: Tags[];
  removable: boolean;
  action?: (tagName: string) => void;
}
