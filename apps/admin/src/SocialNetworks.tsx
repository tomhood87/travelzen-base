import React from "react";
import gql from "graphql-tag";
import { WebsiteSettingsConfig } from "@webiny/app-page-builder";
import { Bind } from "@webiny/form";
import { Input } from "@webiny/ui/Input";

const { Group, Element } = WebsiteSettingsConfig;

const Network1 = () => {
    return (
        <Bind name={"network1"}>
            <Input label="Network 1" />
        </Bind>
    );
};

const Network2 = () => {
    return (
        <Bind name={"network2"}>
            <Input label="Network 2" />
        </Bind>
    );
};

export const SocialNetworks = () => {
    const socialNetworks = gql`
        {
            network1
            network2
        }
    `;

    return (
        <WebsiteSettingsConfig>
            <Group name={"socialNetworks"} label={"Social Networks"} querySelection={socialNetworks}>
                <Element name={"network1"} element={<Network1 />} />
                <Element name={"network2"} element={<Network2 />} />
            </Group>
        </WebsiteSettingsConfig>
    );
};