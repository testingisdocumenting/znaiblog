import * as React from 'react';

interface Props {
    text: string;
}

export function SimpleTextOverride({text}: Props) {
    return (
        <div>@@{text}@@</div>
    );
}
