import React from "react";

import { cn } from "@/lib/utils";

export function renderStatusBadge(status: string | number | null | undefined, className?: string) {
  if (status === null || status === undefined) return null;
  const normalized = String(status).trim().toLowerCase().replace(/\s+/g, "");
  const statusMap: Record<string, { text: string; color: string; bg: string }> = {
    completed: { text: "Completed", color: "#FFFFFF", bg: "#35AF62" },
    paid: { text: "Paid", color: "#222222", bg: "#D0F9D9" },
    canceled: { text: "Canceled", color: "#FFFFFF", bg: "#DD2A77" },
    pending: { text: "Pending", color: "#FFFFFF", bg: "#EAB308" },
    requested: { text: "Requested", color: "#FFFFFF", bg: "#EAB308" },
    invoicepending: { text: "Invoice Pending", color: "#FFFFFF", bg: "#EAB308" },
    paymentrequested: { text: "Payment Requested", color: "#FFFFFF", bg: "#EAB308" },
    manual: { text: "Manual Payment", color: "#FFFFFF", bg: "#02B1FD" },
    disapproved: { text: "Disapproved", color: "#FFFFFF", bg: "#DD2A77" },
    approved: { text: "Approved", color: "#FFFFFF", bg: "#35AF62" },
    unpaid: { text: "Unpaid", color: "#222222", bg: "#F9D0D0" },
    closed: { text: "Closed", color: "#FFFFFF", bg: "#02B1FD" },
    booked: { text: "Booked", color: "black", bg: "#E1BB87" },
    requesttopay: { text: "Request To Pay", color: "#FFFFFF", bg: "#35AF62" }, // ✅ حالا با فاصله هم کار می‌کند
    "0": { text: "Inactive", color: "#FFFFFF", bg: "#DD2A77" },
    "1": { text: "Active", color: "#FFFFFF", bg: "#35AF62" },
    "2": { text: "Pending", color: "#FFFFFF", bg: "#EAB308" },
  };
  const current = statusMap[normalized] || { text: status, color: "#222", bg: "#EAEAEA" };

  return (
    <p
      className={cn("rounded-full px-3 py-0.5 text-[12px] font-bold capitalize", className)}
      style={{
        backgroundColor: current.bg,
        color: current.color,
      }}
    >
      {current.text}
    </p>
  );
}
