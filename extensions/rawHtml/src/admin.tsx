import React from "react";
import {
    PbEditorPageElementAdvancedSettingsPlugin,
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder";
import { RawHtml } from "./RawHtml";
import { OnCreateActions } from "@webiny/app-page-builder/types";
import { AdvancedSettings } from "./admin/AdvancedSettings"; // We'll define a simple HTML editor here

// Initial element data
const INITIAL_ELEMENT_DATA = {
    html: "<p>Your HTML here</p>"
};

export const Extension = () => (
    <>
        {/* Register the renderer */}
        <PbRenderElementPlugin elementType={"rawHtml"} renderer={RawHtml} />

        {/* Register the page builder element */}
        <PbEditorPageElementPlugin
            elementType={"rawHtml"}
            renderer={RawHtml}
            toolbar={{
                title: "Raw HTML",
                group: "pb-editor-element-group-basic",
                preview() {
                    return <>Raw HTML</>;
                }
            }}
            settings={[
                "pb-editor-page-element-settings-delete",
                "pb-editor-page-element-settings-visibility",
                "pb-editor-page-element-style-settings-padding",
                "pb-editor-page-element-style-settings-margin",
                "pb-editor-page-element-style-settings-width",
                "pb-editor-page-element-style-settings-height",
                "pb-editor-page-element-style-settings-background"
            ]}
            target={["cell", "block"]}
            onCreate={OnCreateActions.OPEN_SETTINGS}
            create={options => ({
                type: "rawHtml",
                elements: [],
                data: INITIAL_ELEMENT_DATA,
                ...options
            })}
        />

        {/* Advanced settings panel */}
        <PbEditorPageElementAdvancedSettingsPlugin
            elementType={"rawHtml"}
            element={<AdvancedSettings />}
        />
    </>
);
