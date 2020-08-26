import * as React from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCollapsibleStack } from './hooks';
var CollapsibleStackSub = function (_a) {
    var children = _a.children;
    var navigation = useNavigation();
    var translateY = useCollapsibleStack().translateY;
    var handleLayout = function (_a) {
        var _b = _a.nativeEvent.layout.height, height = _b === void 0 ? 0 : _b;
        navigation.setParams({
            collapsibleSubHeaderHeight: height,
            isCollapsibleDirty: true,
        });
    };
    return (<Animated.View style={{
        transform: [{ translateY: translateY }],
        position: 'absolute',
        width: '100%',
    }} onLayout={handleLayout}>
      {children}
    </Animated.View>);
};
export { CollapsibleStackSub };
