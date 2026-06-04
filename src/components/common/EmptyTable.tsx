"use client";

import React from "react";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";

type EmptyTableProps = {
        message?: string;
};

export const EmptyTable: React.FC<EmptyTableProps> = ({ message }) => {
        const { lang } = useLangStore();
        const t = translations[lang as "fa" | "en"];

        return (
                <div className="flex h-60 w-full items-center justify-center border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <span className="text-gray-500 text-lg font-medium">
                                {message ?? t.NotFound}
                        </span>
                </div>
        );
};