import { FieldConfig } from "@/types/modals/modals";

export const getMenuFormFields = (t: any): FieldConfig[] => [
  {
    name: "titleFa",
    label: `${t.form?.title} ${t.fa}`,
    type: "text",
    required: true,
    placeholder: t.form?.titlePlaceholderLfa,
  },
  {
    name: "titleEn",
    label: `${t.form?.title} ${t.en}`,
    type: "text",
    required: true,
    placeholder: t.form?.titlePlaceholderLen,
  },
  {
    name: "order",
    label: `${t.form?.order}`,
    type: "number",
    required: true,
    placeholder: t.form?.orderPlaceholderL,
  },
  {
    name: "isActive",
    label: t.form?.isActive,
    type: "switch",
  },
];
