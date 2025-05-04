export function urgencyColor(urgency: number): string {
    const colors = ["#d1d5db", "#a5b4fc", "#6ee7b7", "#facc15", "#f97316", "#ef4444"];
    if (urgency >= 9) return colors[5]; // Red
    if (urgency >= 7) return colors[4]; // Orange
    if (urgency >= 5) return colors[3]; // Yellow
    if (urgency >= 3) return colors[2]; // Green
    if (urgency >= 1) return colors[1]; // Blue
    return colors[0]; // Gray
}
