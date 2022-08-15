import {message} from "antd";

export async function copyToClipboard(str: string) {
  if (navigator.clipboard && navigator.permissions) {
    await navigator.clipboard.writeText(str)
    message.success("Copy Successfully")
  } else {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    message.success("Copy Successfully")
  }
}