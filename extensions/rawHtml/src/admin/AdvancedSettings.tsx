import React from "react";
import { Bind, useForm } from "@webiny/form";
import { ButtonPrimary } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { CodeEditor } from "@webiny/ui/CodeEditor";

export const AdvancedSettings = () => {
    const { submit } = useForm();

    return (
        <Grid>
            <Cell span={12}>
                <Bind name="html">
                    <CodeEditor
                        theme="textmate"
                        readOnly={false}
                        description="Enter the raw HTML you want to render."
                        mode="html"
                    />
                </Bind>
            </Cell>
            <Cell span={12}>
                <ButtonPrimary onClick={submit}>Save</ButtonPrimary>
            </Cell>
        </Grid>
    );
};
