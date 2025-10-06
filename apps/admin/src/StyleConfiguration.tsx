import React from "react";
import { WebsiteSettingsConfig } from "@webiny/app-page-builder";
import { Bind } from "@webiny/form";
import { ColorPicker } from "@webiny/ui/ColorPicker";
import { Input } from "@webiny/ui/Input";
import gql from "graphql-tag";

const { Group, Element } = WebsiteSettingsConfig;

// Primary font input
const PrimaryFont = () => (
    <Bind name={"primaryfont"}>
        <Input
            label="Primary Font"
            description="Enter the Fonts URL for your primary font"
            placeholder="https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap"
        />
    </Bind>
);

// Secondary font input
const SecondaryFont = () => (
    <Bind name={"secondaryfont"}>
        <Input
            label="Secondary Font"
            description="Enter the Fonts URL for your secondary font"
            placeholder="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
        />
    </Bind>
);

// Primary color with default
const PrimaryColour = () => (
    <Bind name={"primarycolour"}>
        <ColorPicker label="Primary Colour" description="Primary theme colour" value="#0043B3" />
    </Bind>
);

// Secondary color with default
const SecondaryColour = () => (
    <Bind name={"secondarycolour"}>
        <ColorPicker
            label="Secondary Colour"
            description="Secondary theme colour"
            value="#334A71"
        />
    </Bind>
);

export const StyleConfiguration = () => {
    const styleConfig = gql`
        {
           primaryfont
           secondaryfont
           primarycolour
           secondarycolour
        }
    `;
    return (
        <WebsiteSettingsConfig>
            <Group
                name={"styleConfiguration"}
                label={"Style Configuration"}
                querySelection={styleConfig}
            >
                <Element name={"primaryfont"} element={<PrimaryFont />} />
                <Element name={"secondaryfont"} element={<SecondaryFont />} />
                <Element name={"primarycolour"} element={<PrimaryColour />} />
                <Element name={"secondarycolour"} element={<SecondaryColour />} />
            </Group>
        </WebsiteSettingsConfig>
    );
};
