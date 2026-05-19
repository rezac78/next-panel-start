import { FieldConfig } from "@/types/modals/modals";

export const projectFormFields: FieldConfig[] = [
  {
    name: "title",
    label: "Project Title",
    type: "text",
    required: true,
    placeholder: "e.g. CV Admin Panel",
  },
  {
    name: "shortDescription",
    label: "Short Description",
    type: "textarea",
    placeholder: "Short summary of the project",
  },
  {
    name: "longDescription",
    label: "Detailed Description",
    type: "editor",
    placeholder: "Describe the project in detail",
  },
  {
    name: "tools",
    label: "Tools & Technologies",
    type: "multiselect",
    options: [], // از بیرون inject می‌کنی
    placeholder: "Select tools",
  },
  {
    name: "links",
    label: "Project Links",
    type: "repeater",
    options: [
      { label: "URL", value: "url" },
      { label: "GitHub", value: "github" },
      { label: "Docs", value: "docs" },
    ],
  },
  {
    name: "image",
    label: "Banner Image",
    type: "file",
  },
];
