import { FieldConfig } from "@/types/modals/modals";

export const blogFormFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    required: true,
  },
  {
    name: "excerpt",
    label: "Excerpt",
    type: "textarea",
  },
  {
    name: "content",
    label: "Content",
    type: "editor",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
  },
  {
    name: "tags",
    label: "Tags",
    type: "multiselect",
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
    name: "readingTime",
    label: "Reading Time (min)",
    type: "number",
  },
  {
    name: "image",
    label: "Banner Image",
    type: "file",
  },
  {
    name: "isFeatured",
    label: "is Featured",
    type: "switch",
  },
];
