import React, { ReactElement } from 'react';

declare const Paragraph: ({ text, }: {
    text?: string | undefined;
}) => ReactElement;

declare type NGProgressType = {
    isAnimating: boolean;
    spinner?: boolean;
    onlySpinner?: boolean;
    barColor?: string;
};
declare const NGProgress: React.FC<NGProgressType>;

declare function Button({ text }: {
    text?: string;
}): JSX.Element;

declare function GreenButton({ text }: {
    text?: string;
}): JSX.Element;

export { Button, GreenButton, NGProgress, Paragraph };
