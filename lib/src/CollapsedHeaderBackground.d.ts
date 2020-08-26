import { Animated } from 'react-native';
export declare type Params = {
    translateY: Animated.AnimatedInterpolation;
    opacity: Animated.AnimatedInterpolation;
    backgroundColor: string | null;
    collapsedColor: string | null;
    elevation?: number;
};
declare const CollapsedHeaderBackground: ({ translateY, opacity, backgroundColor, collapsedColor, elevation, }: Params) => () => JSX.Element;
export { CollapsedHeaderBackground };
