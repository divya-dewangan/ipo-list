export const graphColors = [
    "#4A90E2", // Blue
    "#E94E77", // Pink
    "#50E3C2", // Teal
    "#F5A623", // Orange
    "#7B92A5", // Light Blue
    "#D0021B", // Red
    "#F8E71C", // Yellow
    "#B2B2B2", // Gray
    "#8B572A", // Brown
    "#D5A6BD", // Lavender
    "#B8E986", // Light Green
    "#FF6F61", // Coral
    "#6A5ACD", // Slate Blue
    "#FFD700", // Gold
    "#ADFF2F", // Green Yellow
    "#FF4500", // Orange Red
    "#32CD32", // Lime Green
    "#FF1493", // Deep Pink
    "#00CED1", // Dark Turquoise
    "#B0C4DE", // Light Steel Blue
    "#C71585", // Medium Violet Red
    "#00BFFF", // Deep Sky Blue
    "#7CFC00", // Lawn Green
    "#DA70D6", // Orchid
    "#FF8C00", // Dark Orange
    "#D2691E", // Chocolate
    "#00FA9A", // Medium Spring Green
    "#8A2BE2", // Blue Violet
    "#F0E68C", // Khaki
    "#FF6347", // Tomato
    "#9ACD32", // Yellow Green
    "#4682B4", // Steel Blue
    "#FFDAB9", // Peach Puff
];

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * graphColors.length);
    return graphColors[randomIndex];
}