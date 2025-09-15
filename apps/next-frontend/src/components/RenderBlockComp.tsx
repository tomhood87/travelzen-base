"use client";
import React from "react";

interface WebinyBlock {
    type: string;
    data: any;
    elements?: WebinyBlock[];
}

interface Props {
    blocks: WebinyBlock[];
}

// Helper to extract text from Webiny rich text JSON
function extractText(node: any): string {
    if (!node) return "";

    if (typeof node === "string") {
        // Sometimes it's already a plain string
        return node;
    }

    if (node.text) return node.text;

    if (node.root) return extractText(node.root.children);

    if (Array.isArray(node)) return node.map(extractText).join(" ");

    if (node.children) return node.children.map(extractText).join(" ");

    return "";
}

const renderers: Record<string, (props: any) => React.ReactNode> = {
    heading: ({ data }: any) => {
        const rawText = extractText(
            typeof data.text?.data?.text === "string"
                ? JSON.parse(data.text.data.text)
                : data.text?.data?.text
        );
        const Tag = data?.text?.desktop?.tag || "h2";
        return <Tag>{rawText}</Tag>;
    },
    paragraph: ({ data }: any) => {
        const rawText = extractText(
            typeof data.text?.data?.text === "string"
                ? JSON.parse(data.text.data.text)
                : data.text?.data?.text
        );
        return <p>{rawText}</p>;
    },
    image: ({ data }: any) => {
        const src = data?.image?.file?.src;
        if (!src) return null;
        return <img src={src} alt="" />;
    },
};

// Recursive renderer
export default function RenderBlockComp({ blocks }: Props) {
    return (
        <>
            {blocks.map((block, i) => {
                const Renderer = renderers[block.type];
                const content = Renderer ? Renderer({ data: block.data }) : null;

                const children = block.elements?.length ? (
                    <RenderBlockComp blocks={block.elements} />
                ) : null;

                return (
                    <React.Fragment key={i}>
                        {content}
                        {children}
                    </React.Fragment>
                );
            })}
        </>
    );
}
