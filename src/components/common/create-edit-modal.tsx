"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExtendedFieldConfig, FieldConfig } from "@/types/modals/modals";

import { Switch } from "@/components/ui/switch";
import TimeField from "@/components/common/TimeField";
import { MultiSelect } from "../ui/multi-select";
import Image from "next/image";
import RichTextEditor from "../editor/rich-text-editor";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";
import { Plus, Trash2Icon } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { slugify } from "@/lib/utils";

interface CreateEditModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: (data: Record<string, any>) => Promise<boolean>;
  fields: ExtendedFieldConfig[];
  defaultValues?: Record<string, any>;
  saveText?: string;
  onFieldChange?: (name: string, value: any) => void;
  loading?: boolean;
  modalSize?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function CreateEditModal({
  open,
  title,
  onClose,
  onSave,
  fields,
  defaultValues = {},
  saveText = "Save",
  onFieldChange,
  loading,
  modalSize = "full",
}: CreateEditModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const sizeMap = {
    sm: "!max-w-md",
    md: "!max-w-xl",
    lg: "!max-w-2xl",
    xl: "!max-w-4xl",
    full: "!max-w-[95vw]",
  };

  React.useEffect(() => {
    if (open) {
      setFormData(defaultValues);
      setSlugEdited(false);
    }
  }, [open, defaultValues]);
  const handleChange = useCallback(
    (name: string, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (onFieldChange) {
        debounceRef.current = setTimeout(() => {
          onFieldChange(name, value);
        }, 300);
      }
    },
    [onFieldChange]
  );

  const handleSubmit = async () => {
    if (!onSave) return;
    const success = await onSave(formData); // boolean
    if (success) onClose();
  };
  const imagePreview = useMemo(() => {
    const img = formData.image;
    if (!img) return null;

    if (img instanceof File) {
      return URL.createObjectURL(img);
    }

    if (typeof img === "string") {
      return img;
    }

    return null;
  }, [formData.image]);

  const groups = useMemo(() => {
    const g: Record<string, FieldConfig[]> = {};
    fields.forEach((f) => {
      const [base, rest] = f.name.split("_");
      if (["from", "to", "closed"].includes(rest)) {
        if (!g[base]) g[base] = [];
        g[base].push(f);
      }
    });

    return g;
  }, [fields]);

  const hasGroupedTimes = Object.keys(groups)?.length > 0;

  const switchFields = fields.filter((f) => f.type === "switch");
  const normalFields = fields.filter(
    (f) =>
      f.type !== "switch" &&
      !(f.name.includes("_from") || f.name.includes("_to") || f.name.includes("_closed"))
  );
  const handleCoverSlog = (value: string, Type: string) => {
    setFormData((prev) => ({ ...prev, [Type]: value }));

    if (!slugEdited) {
      setFormData((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };
  const handleSlug = (value: string) => {
    setSlugEdited(true);
    setFormData((prev) => ({ ...prev, slug: value }));
  };

  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`w-full ${sizeMap[modalSize]} max-h-[calc(100vh-80px)] flex flex-col p-0 overflow-hidden`}
      >
        <div className="border-b px-6 py-4 shrink-0 bg-background/95 backdrop-blur rounded-4">
          <DialogHeader >
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </DialogHeader>
        </div>
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <svg
              className="mr-2 h-5 w-5 animate-spin opacity-40"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            {`${t.loading}....`}
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            {hasGroupedTimes && (
              <div className="space-y-4">
                {Object.keys(groups).map((base) => {
                  const fromField = groups[base].find((f) => f.name === `${base}_from`);
                  const toField = groups[base].find((f) => f.name === `${base}_to`);

                  return (
                    <div key={base} className="grid grid-cols-12 items-center gap-3">
                      <div className="col-span-5">
                        <Label
                          className={`text-sm font-medium ${base === defaultValues.selectedDay ? "font-bold" : "opacity-70"
                            }`}
                        >
                          {fromField?.label}{" "}
                          {fromField?.required && <span className="text-red-500">*</span>}
                        </Label>
                        <TimeField
                          value={formData[`${base}_from`] ?? ""}
                          onChangeAction={(v) => handleChange(`${base}_from`, v)}
                          className="mt-1"
                          disabled={!!formData[`${base}_closed`]}
                        />
                      </div>
                      <div className="col-span-5">
                        <Label
                          className={`text-sm font-medium ${base === defaultValues.selectedDay ? "font-bold" : "opacity-70"
                            }`}
                        >
                          {toField?.label}{" "}
                          {toField?.required && <span className="text-red-500">*</span>}
                        </Label>
                        <TimeField
                          value={formData[`${base}_to`] ?? ""}
                          onChangeAction={(v) => handleChange(`${base}_to`, v)}
                          className="mt-1"
                          disabled={!!formData[`${base}_closed`]}
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={formData[`${base}_closed`]}
                            onCheckedChange={(val) => handleChange(`${base}_closed`, Boolean(val))}
                            id={`${base}_closed`}
                          />
                          <Label htmlFor={`${base}_closed`} className="text-sm">
                            Closed
                          </Label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className={`mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 ${hasGroupedTimes ? "border-grey-200 border-t" : ""
                }`}
            >
              {normalFields.map((field, i) => {
                if (field.name === "state") {
                  const hasCountry = !!formData.country;
                  const hasOptions = field.options && field.options?.length > 0;
                  if (!hasCountry || !hasOptions) return null;
                }
                const isWide =
                  field.type === "textarea" || field.type === "editor" || field.type === "repeater";

                return (
                  <div
                    key={`${field.name}${i}`}
                    className={`flex flex-col space-y-1.5 ${isWide ? "sm:col-span-2" : ""}`}
                  >
                    <Label className="text-sm font-medium opacity-70">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </Label>

                    {field.type === "calender" ? (
                      <DatePicker
                        value={formData[field.name] ?? ""}
                        onChange={(html) => handleChange(field.name, html)}
                        placeholder={field.label}
                      />
                    ) : field.type === "editor" ? (
                      <div className="">
                        <RichTextEditor
                          value={formData[field.name] ?? ""}
                          onChange={(html) => handleChange(field.name, html)}
                          placeholder={field.placeholder ?? "Write..."}
                          className="w-full"
                          editorClassName="w-full"
                        />
                      </div>
                    ) : field.type === "file" ? (
                      <label className="group hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            handleChange(field.name, file);
                          }}
                        />

                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            width={64}
                            unoptimized
                            height={64}
                            className="h-16 w-16 rounded-lg object-cover"
                            alt="preview"
                          />
                        ) : (
                          <div className="text-sm opacity-70">{t.uploadAnImage}</div>
                        )}
                      </label>
                    ) : field.type === "repeater" ? (
                      <div className="space-y-2 sm:col-span-2">
                        {(formData[field.name] ?? []).map((item: any, idx: number) => (
                          <div key={idx} className="grid grid-cols-12 gap-2">
                            <Select
                              value={item.name ?? ""}
                              onValueChange={(val) => {
                                const copy = [...(formData[field.name] ?? [])];
                                copy[idx] = { ...copy[idx], name: val };
                                handleChange(field.name, copy);
                              }}
                            >
                              <SelectTrigger className="col-span-4 border-grey-300 hover:border-grey-400 focus:border-grey-500 focus:ring-grey-200 bg-background flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm opacity-70 shadow-sm transition-all focus:ring-2">
                                <SelectValue placeholder={field.placeholder ?? `${t.Select}...`} />
                              </SelectTrigger>

                              <SelectContent>
                                {field.options?.map((opt, i) => (
                                  <SelectItem key={`${opt.value}${i}`} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Input
                              className="col-span-6"
                              placeholder="URL"
                              value={item.url ?? ""}
                              onChange={(e) => {
                                const copy = [...(formData[field.name] ?? [])];
                                copy[idx] = { ...copy[idx], url: e.target.value };
                                handleChange(field.name, copy);
                              }}
                            />

                            <Button
                              type="button"
                              variant="destructive-outline"
                              size={"icon"}
                              className="col-span-2"
                              onClick={() => {
                                const filtered = (formData[field.name] ?? []).filter(
                                  (_: any, i: number) => i !== idx
                                );
                                handleChange(field.name, filtered);
                              }}
                            >
                              <Trash2Icon />
                            </Button>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="accent"
                          size={"icon"}
                          onClick={() =>
                            handleChange(field.name, [
                              ...(formData[field.name] ?? []),
                              { name: "", url: "" },
                            ])
                          }
                        >
                          <Plus />
                        </Button>
                      </div>
                    ) : field.type === "multiselect" ? (
                      field.loading ? (
                        <div className="flex h-10 items-center justify-center text-sm opacity-70">
                          {`${t.loading}...`}
                        </div>
                      ) : (
                        <MultiSelect
                          options={
                            field.options?.map((opt) => ({
                              label: opt.label,
                              value: String(opt.value),
                            })) ?? []
                          }
                          selected={(formData[field.name] ?? []).map(String)}
                          onChange={(vals) => {
                            const normalized = vals.map((v) => v); // string[]
                            handleChange(field.name, normalized);
                            if (field.onChange) field.onChange(normalized);
                          }}
                          placeholder={field.placeholder ?? `${t.Select}...`}
                        />
                      )
                    ) : field.type === "select" ? (
                      <Select
                        onValueChange={(val) => handleChange(field.name, val)}
                        value={formData[field.name] ?? ""}
                      >
                        <SelectTrigger className="border-grey-300 hover:border-grey-400 focus:border-grey-500 focus:ring-grey-200 bg-background flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm opacity-70 shadow-sm transition-all focus:ring-2">
                          <SelectValue placeholder={field.placeholder ?? `${t.Select}...`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((opt, i) => (
                            <SelectItem key={`${opt.value}${i}`} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "time" ? (
                      <TimeField
                        value={formData[field.name] ?? ""}
                        onChangeAction={(v) => handleChange(field.name, v)}
                        className="mt-0"
                      />
                    ) : field.type === "textarea" ? (
                      <textarea
                        required={field.required}
                        placeholder={field.placeholder}
                        value={formData[field.name] ?? ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="border-grey-300 focus:border-grey-400 focus:ring-grey-400 min-h-[100px] rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 disabled:bg-gray-100 disabled:opacity-50"
                      />
                    ) : field.type === "phone" ? (
                      <div className="relative">
                        {/* <PhoneInput
                          country={"ae"}
                          value={formData[field.name] ?? ""}
                          onChange={(value) => {
                            const normalized = value.startsWith("+") ? value : `+${value}`;
                            handleChange(field.name, normalized);
                          }}
                          inputProps={{
                            name: field.name,
                            required: field.required,
                            autoFocus: false,
                            autoComplete: "off",
                          }}
                          containerClass="!w-full"
                          inputClass="!w-full !h-10 !text-sm !rounded-md !border !border-grey-300 !pl-12 focus:!border-grey-500 focus:!ring-grey-200 focus:!shadow-none disabled:!bg-gray-100 disabled:!opacity-50"
                          buttonClass="!absolute !left-0 !top-0 !h-10 !rounded-l-md !border !border-grey-300 !bg-grey-50"
                        /> */}
                      </div>
                    ) : (
                      <Input
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={formData[field.name] ?? ""}
                        onChange={(e) => {
                          if (field.name === "name") {
                            handleCoverSlog(e.target.value, "name");
                          } else if (field.name === "title") {
                            handleCoverSlog(e.target.value, "title");
                          } else if (field.name === "slug") {
                            handleSlug(e.target.value);
                          } else {
                            handleChange(field.name, e.target.value);
                          }
                        }}
                        className="border-grey-300 focus:border-grey-400 focus:ring-grey-400 h-10 rounded-md border px-3 text-sm shadow-sm focus:ring-1 disabled:bg-gray-100 disabled:opacity-50"
                      />
                    )}
                  </div>
                );
              })}
              {switchFields.map((field, i) => (
                <div key={i} className="flex items-center justify-between sm:col-span-2">
                  <Label className="text-sm font-medium opacity-70">{field.label}</Label>
                  <div className="flex items-center gap-3" dir="ltr">
                    <Switch
                      checked={formData[field.name] === "1"}
                      onCheckedChange={(checked) => handleChange(field.name, checked ? "1" : "0")}
                    />
                    <span className="text-sm font-medium opacity-50">
                      {formData[field.name] === "1" ? t.Active : t.Inactive}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="border-t px-6 py-4 flex justify-end gap-2 shrink-0 bg-background rounded-4">
          <Button variant="outline" onClick={onClose}>
            {t.cancel}
          </Button>
          <Button className="text-white" onClick={handleSubmit}>
            {saveText}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
