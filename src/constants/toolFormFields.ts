import { FieldConfig } from "@/types/modals/modals";

export const toolFormFields: FieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "e.g. React",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
    placeholder: "react",
  },
  {
    name: "image",
    label: "Image",
    type: "file",
    required: true,
  },
];
