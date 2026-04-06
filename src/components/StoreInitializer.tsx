"use client";

import { useRef } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function StoreInitializer({ uuid }: { uuid: string }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useAppStore.setState({ uuid });
    initialized.current = true;
  }
  return null;
}
