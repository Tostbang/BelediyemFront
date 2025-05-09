"use client";
import { unstableSetRender } from 'antd';
import { createRoot, Root } from 'react-dom/client';

export default function AntdStable() {
    unstableSetRender((node, container) => {
        (container as HTMLElement & { _reactRoot?: Root })._reactRoot ||= createRoot(container);
        const root = (container as HTMLElement & { _reactRoot?: Root })._reactRoot;
        root!.render(node);
        return async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
            root!.unmount();
        };
    });
    return null;
}
