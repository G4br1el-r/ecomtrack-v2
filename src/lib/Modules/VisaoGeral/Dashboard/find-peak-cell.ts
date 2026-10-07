export function findPeakCell(matrix: number[][]): { day: number; hour: number } {
  let peak = { day: 0, hour: 0, value: Number.NEGATIVE_INFINITY };
  matrix.forEach((row, day) => {
    row.forEach((value, hour) => {
      if (value > peak.value) peak = { day, hour, value };
    });
  });
  return { day: peak.day, hour: peak.hour };
}
