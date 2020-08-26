/* global global */
import { Platform, StatusBar } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
var SAFEBOUNCE_HEIGHT_IOS = 300;
var SAFEBOUNCE_HEIGHT_ANDROID = 100;
var safeBounceHeight = Platform.select({
    ios: SAFEBOUNCE_HEIGHT_IOS,
    android: SAFEBOUNCE_HEIGHT_ANDROID,
});
var setSafeBounceHeight = function (height) {
    safeBounceHeight = height;
};
var getSafeBounceHeight = function () { return safeBounceHeight; };
var getDefaultHeaderHeight = function (isLandscape) {
    if (Platform.OS === 'ios') {
        if (isLandscape && !Platform.isPad) {
            return 32;
        }
        else {
            return 44;
        }
    }
    else if (Platform.OS === 'android') {
        return 56;
    }
    return 0;
};
var disabledExpoTranslucentStatusBar = false;
var disableExpoTranslucentStatusBar = function () {
    disabledExpoTranslucentStatusBar = true;
};
var getStatusBarHeight = function (isLandscape) {
    if (Platform.OS === 'ios') {
        if (isLandscape)
            return 0;
        return isIphoneX() ? 44 : 20;
    }
    else if (Platform.OS === 'android') {
        // @ts-ignore
        return global.Expo && !disabledExpoTranslucentStatusBar
            ? StatusBar.currentHeight
            : 0;
    }
    else
        return 0;
};
var getNavigationHeight = function (isLandscape, headerHeight) {
    return headerHeight + getStatusBarHeight(isLandscape);
};
var getScrollIndicatorInsetTop = function (isLandscape, headerHeight) {
    if (Platform.OS === 'ios') {
        if (isIphoneX())
            return getStatusBarHeight(isLandscape);
        else
            return headerHeight;
    }
    return headerHeight + getStatusBarHeight(isLandscape);
};
var getElevationStyle = function (elevation) {
    if (Platform.OS === 'ios') {
        if (elevation === 0)
            return null;
        else
            return {
                shadowOpacity: 0.0015 * elevation + 0.18,
                shadowRadius: 0.54 * elevation,
                shadowOffset: {
                    height: 0.6 * elevation,
                    width: 0.6 * elevation,
                },
            };
    }
    else {
        return {
            elevation: elevation,
        };
    }
};
export { setSafeBounceHeight, getSafeBounceHeight, getDefaultHeaderHeight, getNavigationHeight, getStatusBarHeight, getScrollIndicatorInsetTop, disableExpoTranslucentStatusBar, getElevationStyle, };
