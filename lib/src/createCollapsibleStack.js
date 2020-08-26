var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { Animated, Dimensions, } from 'react-native';
import { createStackNavigator, } from '@react-navigation/stack';
import { getSafeBounceHeight, getDefaultHeaderHeight, getNavigationHeight, getScrollIndicatorInsetTop, getStatusBarHeight, } from './utils';
import { CollapsedHeaderBackground as DefaultCollapsedHeaderBackground } from './CollapsedHeaderBackground';
import { CollapsedHeaderContainer } from './CollapsedHeaderContainer';
var Stack = createStackNavigator();
var CollapsibleTarget;
(function (CollapsibleTarget) {
    CollapsibleTarget[CollapsibleTarget["Default"] = 0] = "Default";
    CollapsibleTarget[CollapsibleTarget["SubHeader"] = 1] = "SubHeader";
})(CollapsibleTarget || (CollapsibleTarget = {}));
var createCollapsibleStack = function (ScreenElement, config, collapsibleTarget) {
    if (config === void 0) { config = {}; }
    if (collapsibleTarget === void 0) { collapsibleTarget = CollapsibleTarget.Default; }
    var _a = ScreenElement.props || {}, _b = _a.options, options = _b === void 0 ? {} : _b, UserComponent = _a.component;
    var userOptions = options;
    var positionY = React.useRef(new Animated.Value(0)).current;
    var onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: positionY } } }], {
        useNativeDriver: config.useNativeDriver === undefined ? true : config.useNativeDriver,
    });
    var onScrollWithListener = function (listener) {
        return Animated.event([{ nativeEvent: { contentOffset: { y: positionY } } }], {
            useNativeDriver: config.useNativeDriver === undefined ? true : config.useNativeDriver,
            listener: listener,
        });
    };
    var CollapsedHeaderBackground = config.CollapsedHeaderBackground || DefaultCollapsedHeaderBackground;
    return (<Stack.Screen {...ScreenElement.props} key={config.key} options={function (_a) {
        var navigation = _a.navigation, route = _a.route;
        var _b, _c, _d, _e, _f, _g, _h;
        if (typeof userOptions === 'function')
            userOptions = userOptions({ navigation: navigation, route: route });
        if (config.header) {
            var animatedHeader = function (props) { return (<CollapsedHeaderContainer header={config.header} {...props}/>); };
            userOptions.header = animatedHeader;
        }
        var window = Dimensions.get('window');
        var isLandscape = window.height < window.width;
        var headerHeight = 0;
        if ((_b = route.params) === null || _b === void 0 ? void 0 : _b.collapsibleCustomHeaderHeight) {
            headerHeight =
                route.params.collapsibleCustomHeaderHeight -
                    getStatusBarHeight(isLandscape);
        }
        else {
            if (collapsibleTarget === CollapsibleTarget.SubHeader) {
                headerHeight = ((_c = route.params) === null || _c === void 0 ? void 0 : _c.collapsibleSubHeaderHeight) || 0;
            }
            else {
                if (((_d = userOptions.headerStyle) === null || _d === void 0 ? void 0 : _d.height) != null) {
                    headerHeight =
                        userOptions.headerStyle.height -
                            getStatusBarHeight(isLandscape);
                }
                else {
                    headerHeight = getDefaultHeaderHeight(isLandscape);
                }
            }
        }
        var safeBounceHeight = getSafeBounceHeight();
        var animatedDiffClampY = Animated.diffClamp(positionY, 0, safeBounceHeight + headerHeight);
        var progress = animatedDiffClampY.interpolate({
            inputRange: [safeBounceHeight, safeBounceHeight + headerHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        var translateY = Animated.multiply(progress, -headerHeight);
        var opacity = Animated.subtract(1, progress);
        var setCurrentY = function (currentY) {
            positionY.setValue(currentY);
        };
        var collapsible = {
            onScroll: onScroll,
            onScrollWithListener: onScrollWithListener,
            containerPaddingTop: collapsibleTarget === CollapsibleTarget.SubHeader
                ? headerHeight
                : getNavigationHeight(isLandscape, headerHeight),
            scrollIndicatorInsetTop: collapsibleTarget === CollapsibleTarget.SubHeader
                ? headerHeight
                : getScrollIndicatorInsetTop(isLandscape, headerHeight),
            translateY: translateY,
            progress: progress,
            opacity: opacity,
            setCurrentY: setCurrentY,
        };
        if (((_e = route.params) === null || _e === void 0 ? void 0 : _e.isCollapsibleDirty) ||
            ((_f = route.params) === null || _f === void 0 ? void 0 : _f.collapsible) == null) {
            navigation.setParams({ collapsible: collapsible, isCollapsibleDirty: false });
        }
        return collapsibleTarget === CollapsibleTarget.SubHeader
            ? userOptions
            : __assign(__assign({}, userOptions), { headerStyle: __assign(__assign({}, userOptions.headerStyle), { transform: [{ translateY: translateY }], opacity: opacity }), headerBackground: CollapsedHeaderBackground({
                    translateY: translateY,
                    opacity: opacity,
                    backgroundColor: (_g = userOptions.headerStyle) === null || _g === void 0 ? void 0 : _g.backgroundColor,
                    collapsedColor: config.collapsedColor || ((_h = userOptions.headerStyle) === null || _h === void 0 ? void 0 : _h.backgroundColor),
                    elevation: config.elevation,
                }), headerTransparent: true });
    }} component={UserComponent}/>);
};
var createCollapsibleStackSub = function (ScreenElement, config) {
    if (config === void 0) { config = {}; }
    return createCollapsibleStack(ScreenElement, config, CollapsibleTarget.SubHeader);
};
export { createCollapsibleStack, createCollapsibleStackSub };
