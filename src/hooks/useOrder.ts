import { useState } from "react";

export type DurationOption = 6 | 9 | 12 | 18 | 24 | 36;

export function useOrder() {
  const [duration, setDuration] = useState<DurationOption>(6);
  const [sessionsPerMonth, setSessionsPerMonth] = useState(8);

  return {
    duration,
    setDuration,
    sessionsPerMonth,
    setSessionsPerMonth,
  };
}
