'use client';
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function ReadMarkDown({ source }: { source: string }) {
    return (
        <MDEditor.Markdown
            source={source}
            style={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '8px',
            }}
        />
    );
}
