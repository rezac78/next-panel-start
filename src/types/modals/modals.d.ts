export type FieldType =
  | "text"
  | "email"
  | "date"
  | "calender"
  | "number"
  | "time"
  | "select"
  | "multiselect"
  | "switch"
  | "textarea"
  | "phone"
  | "checkBox"
  | "repeater"
  | "file"
  | "editor";

export type FieldOption = {
  label: string;
  value: string;
};

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  onChange?: (value: any) => void;
}
export interface ExtendedFieldConfig extends FieldConfig {
  loading?: boolean;
  disabled?: boolean;
}
