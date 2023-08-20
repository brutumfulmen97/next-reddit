"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";
const Output = dynamic(
    async () => (await import("editorjs-react-renderer")).default,
    {
        ssr: false,
    }
);

interface EditorOutputProps {
    content: any;
}

const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
};

const style = {
    paragraph: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
    },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
    return (
        <Output
            style={style}
            className="text-sm"
            renderers={renderers}
            data={content}
        />
    );
};

function CustomImageRenderer({ data }: any) {
    const src = data.file.url;
    const alt = data.caption ? data.caption : "Image";
    return (
        <div className="relative w-full min-h-[15rem]">
            <Image alt={alt} className="object-contain" fill src={src} />
        </div>
    );
}

function CustomCodeRenderer({ data }: any) {
    return (
        <pre className="bg-gray-900 rounded-md p-4">
            <code className="text-gray-100 text:sm">{data.code}</code>
        </pre>
    );
}

export default EditorOutput;
