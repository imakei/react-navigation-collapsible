import * as React from 'react';
import { CollapsibleStackConfig } from './types';
declare enum CollapsibleTarget {
    Default = 0,
    SubHeader = 1
}
declare const createCollapsibleStack: (ScreenElement: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>, config?: CollapsibleStackConfig, collapsibleTarget?: CollapsibleTarget) => JSX.Element;
declare const createCollapsibleStackSub: (ScreenElement: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>, config?: CollapsibleStackConfig) => JSX.Element;
export { createCollapsibleStack, createCollapsibleStackSub };
