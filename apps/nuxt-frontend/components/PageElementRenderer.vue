<script lang="ts">
import { defineComponent, h, PropType, resolveComponent } from "vue";

interface PageElement {
  id: string;
  type: string;
  elements?: PageElement[];
  data?: any;
}

export default defineComponent({
  name: "PageElementRenderer", // crucial for recursion
  props: {
    element: {
      type: Object as PropType<PageElement>,
      required: true,
    },
  },
  setup(props) {
    const renderElement = (element: PageElement) => {
      const tagMap: Record<string, string> = {
        heading: "h1",
        text: "p",
        block: "div",
        grid: "div",
        cell: "div",
      };
      const tag = tagMap[element.type] || "div";

      // Render children recursively
      const children = element.elements?.map((child) =>
        h(resolveComponent("PageElementRenderer") as any, {
          element: child,
          key: child.id,
        })
      );

      // Render heading/text content
      let content: string | undefined;
      if (element.type === "heading" || element.type === "text") {
        try {
          const json = element.data?.text?.desktop?.data?.text;
          if (json) {
            const parsed = JSON.parse(json);
            content = parsed.root.children
            .map((c: any) =>
              c.children.map((cc: any) => cc.text).join("")
            )
            .join("\n");
          } else {
            content = element.data?.text?.desktop?.text;
          }
        } catch {
          content = element.data?.text?.desktop?.text;
        }
      }

      return h(tag, {}, content || children);
    };

    return () => renderElement(props.element);
  },
});
</script>
