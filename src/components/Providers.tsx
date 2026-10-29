"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { BookingProvider } from "./BookingProvider";
import { Cursor } from "./Cursor";
import { Intro } from "./Intro";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <SmoothScroll />
      <Intro />
      <Cursor />
      {children}
    </BookingProvider>
  );
}
