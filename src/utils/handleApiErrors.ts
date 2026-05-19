import { toast } from "sonner";

export function handleApiErrors(response: any) {
  if (!response || !response.errors) {
    toast.error("Unexpected error occurred");

    return;
  }

  const { errors } = response;

  const messages: string[] = [];

  Object.keys(errors).forEach((key) => {
    const value = errors[key];

    if (Array.isArray(value)) {
      value.forEach((msg) => messages.push(msg));
    } else if (typeof value === "string") {
      messages.push(value);
    }
  });

  if (messages.length === 0) {
    toast.error("Unexpected validation error");
    
    return;
  }

  // Combine all messages
  const finalMessage = messages.join("\n");

  toast.error(finalMessage);
}
