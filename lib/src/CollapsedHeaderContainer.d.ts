import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
interface Props extends StackHeaderProps {
    header: (props: StackHeaderProps) => React.ReactNode;
}
export declare const CollapsedHeaderContainer: ({ header, ...headerProps }: Props) => JSX.Element;
export {};
