import { computed } from "vue";

export function useInlineStyle(styleData) {
    // styleData can be an object or a JSON string
    const parsed = typeof styleData === "string" ? JSON.parse(styleData) : styleData;

    const styleString = computed(() => {
        if (!parsed) return "";

        let styles = [];

        // Handle margin
        if (parsed.margin?.desktop?.all) {
            styles.push(`margin: ${parsed.margin.desktop.all}`);
        }

        // Handle padding
        if (parsed.padding?.desktop?.all) {
            styles.push(`padding: ${parsed.padding.desktop.all}`);
        }

        return styles.join("; ") + (styles.length ? ";" : "");
    });

    return {
        styleString
    };
}
