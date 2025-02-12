import { Languages } from "./enums";

export function setDirction(locale: Languages) {
  return locale === Languages.ARABIC ? "rtl" : "ltr";
}
export function setTextDirection(locale: Languages) {
  return locale === Languages.ARABIC ? "text-right" : "text-left";
}
