import * as React from 'react';
import { Dimensions, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
var useCollapsibleStack = function () {
    var _a;
    var route = useRoute();
    var navigation = useNavigation();
    var handleOrientationChange = function () {
        navigation.setParams({ isCollapsibleDirty: true });
    };
    React.useEffect(function () {
        Dimensions.addEventListener('change', handleOrientationChange);
        return function () {
            Dimensions.removeEventListener('change', handleOrientationChange);
        };
    }, []);
    return (
    // @ts-ignore
    ((_a = route.params) === null || _a === void 0 ? void 0 : _a.collapsible) || {
        onScroll: null,
        onScrollWithListener: function (e) { return null; },
        containerPaddingTop: 0,
        scrollIndicatorInsetTop: 0,
        translateY: new Animated.Value(0),
        progress: new Animated.Value(0),
        opacity: new Animated.Value(1),
    });
};
export { useCollapsibleStack };
