import React from "react";
import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";

// Type for the element data
export interface RawHtmlElementData {
    html: string;
}

// The renderer component
export const RawHtml = createRenderer(() => {
    const { getElement } = useRenderer();
    const element = getElement<RawHtmlElementData>();

    // Use dangerouslySetInnerHTML to render raw HTML
    return <div dangerouslySetInnerHTML={{ __html: element.data.html || "" }} />;
});
