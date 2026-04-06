"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function StoreInitializer({ uuid }: { uuid: string }) {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      useAppStore.setState({ uuid });
      initialized.current = true;
    }
  }, [uuid]);
  return null;
}
