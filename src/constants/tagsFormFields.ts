import { FieldConfig } from "@/types/modals/modals";

export const tagsFormFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeholder: "e.g. ",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
    placeholder: "react",
  },
];
