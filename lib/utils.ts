import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A test function that returns the provided string argument.
 * @param arg - The string argument to be returned
 * @returns The same string that was passed as an argument
 */

export function returnString(arg: string) {
  return arg;
}
