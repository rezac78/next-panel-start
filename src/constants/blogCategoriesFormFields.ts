import { FieldConfig } from "@/types/modals/modals";

export const blogCategoriesFormFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeholder: "e.g. Frontend Development",
  },
  {
    name: "shortDescription",
    label: "Short Description",
    type: "textarea",
    placeholder: "Short summary of the category",
  },
  {
    name: "longDescription",
    label: "Long Description",
    type: "textarea",
    placeholder: "Detailed description",
  },
  {
    name: "metaTitle",
    label: "Meta Title",
    type: "text",
  },
  {
    name: "metaDescription",
    label: "Meta Description",
    type: "textarea",
  },
  {
    name: "publishDate",
    label: "Publish Date",
    type: "calender",
  },
  {
    name: "image",
    label: "Category Image",
    type: "file",
  },
];
