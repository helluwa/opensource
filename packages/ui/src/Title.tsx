import * as React from "react";

export function GreenButton({ text = "Boop" }: { text?: string }) {
  return <button style={{backgroundColor:'green'}} type="button">{text}</button>;
}
