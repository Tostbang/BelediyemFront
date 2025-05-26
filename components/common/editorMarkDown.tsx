import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// Dynamic import to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
    ssr: false,
});

interface MarkdownEditorProps {
    value?: string;
    name: string;
    onChange?: (value: string | undefined) => void;
    height?: number;
    preview?: 'live' | 'edit' | 'preview';
    placeholder?: string;
    className?: string;
    required?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    value = '',
    name,
    onChange,
    height = 400,
    preview = 'live',
    placeholder = 'İçeriğinizi buraya yazın...',
    className = '',
    required = false,
}) => {
    const [content, setContent] = useState(value);

    useEffect(() => {
        if (value !== content) {
            setContent(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (newValue: string | undefined) => {
        const updatedValue = newValue || '';
        setContent(updatedValue);

        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={`markdown-editor ${className}`} data-color-mode="light">
            {/* Hidden input to store the value for form submission */}
            <input
                type="hidden"
                name={name}
                value={content}
                required={required}
            />

            <MDEditor
                value={content}
                onChange={handleChange}
                height={height}
                preview={preview}
                textareaProps={{
                    placeholder: placeholder,
                }}
            />
        </div>
    );
};

export default MarkdownEditor;
