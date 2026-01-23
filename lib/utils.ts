import { STATUS_TEXT } from "@/constants/enums";
import { ApiErrorResponse } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// for application catch block
export function formatedSerErrRes(msg: string, error: any) {
  return {
    status: 500,
    statusText: STATUS_TEXT.ERROR,
    msg,
    data: null,
    error: error?.message ?? "Unknown clinet error",
  };
}

// for try block
export function formatedApiErrRes(response: ApiErrorResponse) {
  let msg;
  if (Array.isArray(response.msg)) {
    msg = response.msg[0];
  } else if (typeof response.msg !== "string") {
    msg = JSON.stringify(response.msg);
  } else {
    msg = response.msg;
  }

  return {
    status: response.status,
    statusText: response.statusText,
    msg,
    data: null,
    error: JSON.stringify(response.error) ?? "Unknown clinet error",
  };
}

export const modalQuery = (
  type: "delete",
  endpoint: "user" | "property" | "blog" | "image",
  id: string,
  existingParams: Record<string, string | undefined>,
) => {
  return {
    query: {
      ...existingParams,
      modal: type,
      endpoint,
      id,
    },
  };
};

export const formatDate = (date: Date, fallback?: string) => {
  if (!date) return fallback;
  const convertDate = new Date(date);
  const format = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(convertDate);
  return format;
};

export const textTrimmer = (text: string, length: number = 20): string => {
  if (text.length < length) {
    return text;
  }
  return `${text.slice(0, length)}...`;
};

export const kbToBytes = (kb: number) => kb * 1024;
export const bytesToKb = (bytes: number) => bytes / 1024;
export const returnFileSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    // 1 MB or more
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    // 1 KB or more
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    // less than 1 KB
    return bytes + " bytes";
  }
};

export const strToArrElms = (str: string): string[] => {
  if (!str) return [];
  return str
    .split(",")
    .map((element) => element.trim())
    .filter((element) => element !== "");
};

export const returnCanonical = (locale: string, path: string) => {
  const localeParam = locale === "en" ? "/en" : "";
  return `${localeParam}${path}`;
};

export const returnAlternateLanguages = (path: string) => {
  return {
    "x-default": path,
    en: `/en${path}`,
    ar: `${path}`,
  };
};

export const currency = (price: number, locale: string) => {
  return price?.toLocaleString(locale, { style: "currency", currency: "SAR" });
};

export const createDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  ms = 300,
) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, ms);
  };
};
