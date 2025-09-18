import { computed } from "vue";

export function useInlineStyle(styleData: any) {
    const parsed =
        typeof styleData === "string" ? JSON.parse(styleData) : styleData;

    const styleString = computed(() => {
        if (!parsed) return "";

        const styles: string[] = [];

        // ---- Margin ----
        const margin = parsed.margin?.desktop;
        if (margin) {
            const top = margin.top ?? margin.all ?? "0px";
            const right = margin.right ?? margin.all ?? "0px";
            const bottom = margin.bottom ?? margin.all ?? "0px";
            const left = margin.left ?? margin.all ?? "0px";

            styles.push(`margin: ${top} ${right} ${bottom} ${left}`);
        }

        // ---- Padding ----
        const padding = parsed.padding?.desktop;
        if (padding) {
            const top = padding.top ?? padding.all ?? "0px";
            const right = padding.right ?? padding.all ?? "0px";
            const bottom = padding.bottom ?? padding.all ?? "0px";
            const left = padding.left ?? padding.all ?? "0px";

            styles.push(`padding: ${top} ${right} ${bottom} ${left}`);
        }

        return styles.join("; ") + (styles.length ? ";" : "");
    });

    return {
        styleString,
    };
}
