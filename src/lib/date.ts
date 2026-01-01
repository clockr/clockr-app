export function convertFloatToTimeString(hoursFloat: number): string {
  const totalMinutes = Math.round(hoursFloat * 60);

  const hours =
    totalMinutes >= 0
      ? Math.floor(totalMinutes / 60)
      : Math.ceil(totalMinutes / 60);

  const minutes = Math.abs(totalMinutes % 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
