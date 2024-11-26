export const stampBadgeProps = {
    color: {
        type: String,
        default: "primary",
        validator: (v) =>
            ["primary", "error", "warning", "success", "info"].includes(v),
    },
    /**
     * stamp badge size.
     * @default: middle
     */
    size: {
        type: String,
        default: "middle",
        validator: (v) => ["large", "middle", "small"].includes(v),
    },
    /**
     * stamp badge rotate deg.
     * @default: 0
     */
    rotate: { type: Number, default: 0 },
    content: { type: String, default: "Unknown" },
};