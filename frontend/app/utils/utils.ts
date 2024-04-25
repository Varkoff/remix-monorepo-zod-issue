import { useRouteLoaderData } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

/**
 * Combine multiple header objects into one (uses append so headers are not overridden)
 */
export function combineHeaders(
  ...headers: Array<ResponseInit["headers"] | null | undefined>
) {
  const combined = new Headers();
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value);
    }
  }
  return combined;
}

export function useIsDevmode() {
  const devData = z
    .object({
      isDev: z.boolean(),
    })
    .safeParse(useRouteLoaderData("root"));

  if (!devData.success) {
    return false;
  }
  return devData.data.isDev;
}

// Transform text into anchor link (like h1, h2 titles in a blog)
export function getAnchor(text: string | any) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

export type BookingPriceParams = {
  service: string;
  volume: string;
  address: string;
  placeId: string;
  waste: string | null;
  startDate: string;
  endDate: string;
  userId?: string;
  isRecurring: "1" | "0";
  isProfessional: "1" | "0";
  plans: "1" | "0";
  immediatePickup: "1" | "0";
};

export const prettifyBookingId = (id: number) => {
  return `GC - ${id.toString().padStart(6, "0")}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildUrlParams = (params: {
  [key: string]: any;
}): URLSearchParams => {
  const urlParams = new URLSearchParams();
  for (const key in params) {
    urlParams.set(key, params[key]);
  }
  return urlParams;
  // const query = Object.keys(params)
  // 	.map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  // 	.join('&');
  // return query;
  // return `${baseUrl}?${query}`;
};

export const isNumber = (value: string) => {
  if (!value) return false;
  const numberedValue = Number(value);
  const isNumber = !isNaN(numberedValue);
  return isNumber;
};

export const formatSiret = (siretAsString: string) => {
  if (siretAsString.length < 14)
    return siretAsString.replace(/(\d{3})(?=\d)/g, "$1 ");
  return siretAsString.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, "$1 $2 $3 $4");
};

export const removeStringSpaces = (value: string) => {
  return value.replace(/\s/g, "");
};

export function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    if (typeof error.message === "string") {
      return error.message;
    }
    if (typeof error.message === "object") {
      const errorArrays = error.message as string[];
      return errorArrays?.join(", ");
    }
  }
  console.error("Unable to get error message for error", error);
  return "Erreur inconnue";
}
