import React from "react";
import { Admin, Plugins } from "@webiny/app-serverless-cms";
import { Cognito } from "@webiny/app-admin-users-cognito";
import { StyleConfiguration } from "./StyleConfiguration"
import { SocialNetworks } from "./SocialNetworks";
import { Extensions } from "./Extensions";

import "./App.scss";

export const App = () => {
    return (
        <Admin>
            <Cognito />
            <Plugins>
                <SocialNetworks />
                <StyleConfiguration />
            </Plugins>
            <Extensions />
        </Admin>
    );
};
