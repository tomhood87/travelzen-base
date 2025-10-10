import React from "react";
import { Extension as SpaceXElementExtension } from "space-x-element/src/admin";
import { Extension as RawHtmlExtension } from "raw-html/src/admin";

export const Extensions = () => {
    return (
        <>
            <RawHtmlExtension />
            <SpaceXElementExtension />
        </>
    );
};
