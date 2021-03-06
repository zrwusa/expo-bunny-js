import React, { useEffect, useState } from 'react';
import { Animated, I18nManager, StyleSheet, Text, TextInput, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useBunnyKit } from '../../../src/hooks/bunny-kit';
const SMALL_SIZE = 24;
const MEDIUM_SIZE = 34;
const LARGE_SIZE = 44;
const osRtl = I18nManager.isRTL;
export default (props) => {
    const { colors } = useBunnyKit();
    const { min, max, fromValueOnChange, toValueOnChange, step = 1, styleSize = 'medium', fromKnobColor = colors.primary, toKnobColor = colors.primary, inRangeBarColor = colors.primary, outOfRangeBarColor = colors.divider, valueLabelsTextColor = colors.text2, valueLabelsBackgroundColor = '#3a4766', rangeLabelsTextColor = 'rgb(60,60,60)', showRangeLabels = true, showValueLabels = true, initialFromValue, initialToValue, valueLabelsPosition = 'down', showBubbles = false, showValueLabelsOnlyWhenDrag = false, valueLabelsUnit = '', fromValueOnIndicated, toValueOnIndicated, } = props;
    // settings
    const [wasInitialized, setWasInitialized] = useState(false);
    const [knobSize, setKnobSize] = useState(0);
    const [fontSize, setFontSize] = useState(15);
    const [stepInPixels, setStepInPixels] = useState(0);
    // rtl settings
    const [flexDirection, setFlexDirection] = useState('row');
    const [svgOffset, setSvgOffset] = useState({ left: (knobSize - 40) / 2 });
    const [fromValueOffset, setFromValueOffset] = useState(0);
    const [toValueOffset, setToValueOffset] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [fromElevation, setFromElevation] = useState(3);
    const [toElevation, setToElevation] = useState(3);
    // animation values
    const [translateXFromValue] = useState(new Animated.Value(0));
    const [translateXtoValue] = useState(new Animated.Value(0));
    const [fromValueScale] = useState(new Animated.Value(showValueLabelsOnlyWhenDrag ? 0.01 : 1));
    const [toValueScale] = useState(new Animated.Value(showValueLabelsOnlyWhenDrag ? 0.01 : 1));
    const [rightBarScaleX] = useState(new Animated.Value(0.01));
    const [leftBarScaleX] = useState(new Animated.Value(0.01));
    // refs
    const toValueTextRef = React.createRef();
    const fromValueTextRef = React.createRef();
    const opacity = React.useRef(new Animated.Value(0)).current;
    // initializing settings
    useEffect(() => {
        setFlexDirection(osRtl ? 'row-reverse' : 'row');
        setSvgOffset(osRtl ? { right: (knobSize - 40) / 2 } : { left: (knobSize - 40) / 2 });
    }, [knobSize]);
    useEffect(() => {
        if (wasInitialized) {
            const stepSize = setStepSize(max, min, step);
            fromValueTextRef.current?.setNativeProps({ text: min.toString() + valueLabelsUnit });
            toValueTextRef.current?.setNativeProps({ text: max.toString() + valueLabelsUnit });
            if (typeof initialFromValue === 'number' && initialFromValue >= min && initialFromValue <= max) {
                const offset = ((initialFromValue - min) / step) * stepSize - (knobSize / 2);
                setFromValueStatic(offset, knobSize, stepSize);
                setValueText(offset, true);
            }
            if (typeof initialToValue === 'number' && initialToValue >= min && initialToValue <= max && typeof initialFromValue === 'number' && initialToValue > initialFromValue) {
                const offset = ((initialToValue - min) / step) * stepSize - (knobSize / 2);
                setToValueStatic(offset, knobSize, stepSize);
                setValueText(offset, false);
            }
            Animated.timing(opacity, {
                toValue: 1,
                duration: 64,
                useNativeDriver: true
            }).start();
        }
    }, [min, max, step, initialFromValue, initialToValue, wasInitialized]);
    const sizeMap = {
        'small': SMALL_SIZE,
        'medium': MEDIUM_SIZE,
        'large': LARGE_SIZE
    };
    useEffect(() => {
        const size = typeof styleSize === 'number' ? styleSize : sizeMap[styleSize];
        setKnobSize(size);
        translateXFromValue.setValue(-size / 4);
    }, [styleSize]);
    // initializing settings helpers
    const calculateFromValue = (newOffset, knobSize, stepInPixels) => {
        return Math.floor((newOffset + (knobSize / 2)) / stepInPixels) * stepInPixels - (knobSize / 2);
    };
    const setFromValueStatic = (newOffset, knobSize, stepInPixels) => {
        newOffset = calculateFromValue(newOffset, knobSize, stepInPixels);
        setFromValue(newOffset);
        setFromValueOffset(newOffset);
        fromValueOnChange(Math.floor(((newOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min);
    };
    const setFromValue = (newOffset) => {
        translateXFromValue.setValue(newOffset);
        leftBarScaleX.setValue((newOffset + (knobSize / 2)) / sliderWidth + 0.01);
    };
    const calculateToValue = (newOffset, knobSize, stepInPixels) => {
        return Math.ceil((newOffset + (knobSize / 2)) / stepInPixels) * stepInPixels - (knobSize / 2);
    };
    const setToValueStatic = (newOffset, knobSize, stepInPixels) => {
        newOffset = calculateToValue(newOffset, knobSize, stepInPixels);
        setToValue(newOffset);
        setToValueOffset(newOffset);
        toValueOnChange(Math.ceil(((newOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min);
    };
    const setToValue = (newOffset) => {
        translateXtoValue.setValue(newOffset);
        rightBarScaleX.setValue(1.01 - ((newOffset + (knobSize / 2)) / sliderWidth));
    };
    const setStepSize = (max, min, step) => {
        const numberOfSteps = ((max - min) / step);
        const stepSize = sliderWidth / numberOfSteps;
        setStepInPixels(stepSize);
        return stepSize;
    };
    const setValueText = (totalOffset, isFrom = true) => {
        if (isFrom && fromValueTextRef != null) {
            const numericValue = Math.floor(((totalOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min;
            fromValueOnIndicated?.(numericValue);
            fromValueTextRef.current?.setNativeProps({ text: numericValue.toString() + valueLabelsUnit });
        }
        else if (!isFrom && toValueTextRef != null) {
            const numericValue = Math.ceil(((totalOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min;
            toValueOnIndicated?.(numericValue);
            toValueTextRef.current?.setNativeProps({ text: numericValue.toString() + valueLabelsUnit });
        }
    };
    // from value gesture events ------------------------------------------------------------------------
    const onGestureEventFromValue = (event) => {
        let totalOffset = event.nativeEvent.translationX + fromValueOffset;
        if (totalOffset >= -knobSize / 2 && totalOffset < toValueOffset) {
            translateXFromValue.setValue(totalOffset);
            setValueText(totalOffset, true);
            leftBarScaleX.setValue((totalOffset + (knobSize / 2)) / sliderWidth + 0.01);
        }
    };
    const onHandlerStateChangeFromValue = (event) => {
        if (event.nativeEvent.state === State.BEGAN) {
            if (showValueLabelsOnlyWhenDrag)
                scaleTo(fromValueScale, 1);
            setElevations(6, 5);
        }
        if (event.nativeEvent.state === State.END) {
            let newOffset = event.nativeEvent.translationX + fromValueOffset;
            newOffset = calculateFromValue(newOffset, knobSize, stepInPixels);
            if (newOffset < -knobSize / 2) {
                newOffset = -knobSize / 2;
            }
            else if (newOffset >= toValueOffset) {
                newOffset = toValueOffset - stepInPixels;
            }
            setFromValueStatic(newOffset, knobSize, stepInPixels);
            if (showValueLabelsOnlyWhenDrag)
                scaleTo(fromValueScale, 0.01);
        }
    };
    // ------------------------------------------------------------------------------------------------
    // to value gesture events ------------------------------------------------------------------------
    const onGestureEventToValue = (event) => {
        const totalOffset = event.nativeEvent.translationX + toValueOffset;
        if (totalOffset <= sliderWidth - knobSize / 2 && totalOffset > fromValueOffset) {
            translateXtoValue.setValue(totalOffset);
            setValueText(totalOffset, false);
            rightBarScaleX.setValue(1.01 - ((totalOffset + (knobSize / 2)) / sliderWidth));
        }
    };
    const onHandlerStateChangeToValue = (event) => {
        if (event.nativeEvent.state === State.BEGAN) {
            if (showValueLabelsOnlyWhenDrag)
                scaleTo(toValueScale, 1);
            setElevations(5, 6);
        }
        if (event.nativeEvent.state === State.END) {
            let newOffset = event.nativeEvent.translationX + toValueOffset;
            newOffset = calculateToValue(newOffset, knobSize, stepInPixels);
            if (newOffset > sliderWidth - knobSize / 2) {
                newOffset = sliderWidth - knobSize / 2;
            }
            else if (newOffset <= fromValueOffset) {
                newOffset = fromValueOffset + stepInPixels;
            }
            setToValueOffset(newOffset);
            translateXtoValue.setValue(newOffset);
            rightBarScaleX.setValue(1.01 - ((newOffset + (knobSize / 2)) / sliderWidth));
            if (showValueLabelsOnlyWhenDrag)
                scaleTo(toValueScale, 0.01);
            toValueOnChange(Math.ceil(((newOffset + (knobSize / 2)) * (max - min) / sliderWidth) / step) * step + min);
        }
    };
    // ------------------------------------------------------------------------------------------------
    // gesture events help functions ------------------------------------------------------------------
    const scaleTo = (param, toValue) => Animated.timing(param, {
        toValue,
        duration: 150,
        useNativeDriver: true
    }).start();
    const setElevations = (fromValue, toValue) => {
        setFromElevation(fromValue);
        setToElevation(toValue);
    };
    // ------------------------------------------------------------------------------------------------
    // setting bar width ------------------------------------------------------------------------------
    const onLayout = (event) => {
        if (!wasInitialized) {
            const { width } = event.nativeEvent.layout;
            setSliderWidth(width);
            translateXtoValue.setValue(width - knobSize / 2);
            setToValueOffset(width - knobSize / 2);
            setWasInitialized(true);
        }
    };
    // ------------------------------------------------------------------------------------------------
    const bubbleSizeMap = {
        'small': { width: 20, height: 28 },
        'medium': { width: 40, height: 56 },
        'large': { width: 50, height: 70 },
    };
    // const bubbleSizeMap: { [key in Size]: { width: string, height: string } } = {
    //     'small': {width: `${100*20/40}%`, height: `${28*56/56}%`},
    //     'medium': {width: `${100*40/40}%`, height: `${100*56/56}%`},
    //     'large': {width: `${100*50/40}%`, height: `${100*70/56}%`},
    // }
    const bubbleSize = typeof styleSize === 'number' ? { width: styleSize, height: styleSize } : bubbleSizeMap[styleSize];
    const bubbleBottomValue = typeof styleSize === 'number' ? styleSize : bubbleSizeMap[styleSize].height;
    const bubbleBottom = valueLabelsPosition === 'up' ? 0 : -bubbleBottomValue;
    const renderValueLabels = () => {
        return (showValueLabels &&
            <View style={{ width: '100%', height: 1, flexDirection }}>
                <Animated.View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    transform: [{ translateX: translateXFromValue }, { scale: fromValueScale }]
                }}>
                    {showBubbles
                    ?
                        // <Svg {...bubbleSize} style={[svgOffset, {justifyContent: 'center', alignItems: 'center',position:'absolute',bottom:bubbleBottom}]}>
                        //     <Path
                        //         d="M20.368027196163986,55.24077513402203 C20.368027196163986,55.00364778429386 37.12897994729114,42.11537830086061 39.19501224411266,22.754628132990383 C41.26104454093417,3.393877965120147 24.647119286738516,0.571820003300814 20.368027196163986,0.7019902620266703 C16.088935105589453,0.8321519518460209 -0.40167016290734386,3.5393865664909434 0.7742997013327574,21.806127302984205 C1.950269565572857,40.07286803947746 20.368027196163986,55.4779024837502 20.368027196163986,55.24077513402203 z"
                        //         strokeWidth={1}
                        //         fill={valueLabelsBackgroundColor}
                        //         stroke={valueLabelsBackgroundColor}
                        //     />
                        // </Svg>
                        <View style={[svgOffset, {
                                    ...bubbleSize,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    bottom: bubbleBottom,
                                    backgroundColor: 'red'
                                }]}/>
                    : null}
                    <TextInput editable={false} style={{
                    position: 'absolute',
                    width: 50,
                    textAlign: 'center',
                    left: -50 / 4,
                    color: valueLabelsTextColor,
                    bottom: valueLabelsPosition === 'up' ? 18 : -18,
                }} ref={fromValueTextRef}/>
                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    alignItems: 'center',
                    transform: [{ translateX: translateXtoValue }, { scale: toValueScale }]
                }}>
                    {showBubbles
                    ?
                        // <Svg  {...bubbleSize} style={[svgOffset, {justifyContent: 'center', alignItems: 'center',position:'absolute',bottom:bubbleBottom}]}>
                        //     <Path
                        //         d="M20.368027196163986,55.24077513402203 C20.368027196163986,55.00364778429386 37.12897994729114,42.11537830086061 39.19501224411266,22.754628132990383 C41.26104454093417,3.393877965120147 24.647119286738516,0.571820003300814 20.368027196163986,0.7019902620266703 C16.088935105589453,0.8321519518460209 -0.40167016290734386,3.5393865664909434 0.7742997013327574,21.806127302984205 C1.950269565572857,40.07286803947746 20.368027196163986,55.4779024837502 20.368027196163986,55.24077513402203 z"
                        //         strokeWidth={1}
                        //         fill={valueLabelsBackgroundColor}
                        //         stroke={valueLabelsBackgroundColor}
                        //     />
                        // </Svg>
                        <View style={[svgOffset, {
                                    ...bubbleSize,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    bottom: bubbleBottom,
                                    backgroundColor: 'red'
                                }]}/>
                    : null}
                    <TextInput editable={false} style={{
                    position: 'absolute',
                    width: 50,
                    textAlign: 'center',
                    left: -50 / 4,
                    color: valueLabelsTextColor,
                    bottom: valueLabelsPosition === 'up' ? 18 : -18,
                }} ref={toValueTextRef}/>
                </Animated.View>
            </View>);
    };
    const paddingSizeMap = {
        'small': 21,
        'medium': 14,
        'large': 7
    };
    const styles = getStyle(knobSize);
    return (<Animated.View style={[styles.container, {
                opacity,
                padding: typeof styleSize === 'number' ? styleSize / 2 : paddingSizeMap[styleSize]
            }]}>
            {valueLabelsPosition === 'up'
            ? renderValueLabels()
            : null}
            <View style={{
            width: '100%',
            height: knobSize,
            marginVertical: 4,
            position: 'relative',
            flexDirection,
            alignItems: 'center'
        }}>
                <View style={{
            position: 'absolute',
            backgroundColor: inRangeBarColor,
            left: knobSize / 4,
            marginLeft: -knobSize / 4,
            right: knobSize / 4,
            height: knobSize / 3
        }} onLayout={onLayout}/>
                <Animated.View style={{
            position: 'absolute',
            left: knobSize / 4,
            marginLeft: -knobSize / 4,
            right: knobSize / 4,
            height: knobSize / 3,
            backgroundColor: outOfRangeBarColor,
            transform: [{ translateX: sliderWidth / 2 }, { scaleX: rightBarScaleX }, { translateX: -sliderWidth / 2 }]
        }}/>
                <Animated.View style={{
            position: 'absolute',
            left: -knobSize / 4,
            width: knobSize / 2,
            height: knobSize / 3,
            borderRadius: knobSize / 3,
            backgroundColor: outOfRangeBarColor
        }}/>
                <Animated.View style={{
            width: sliderWidth,
            height: knobSize / 3,
            backgroundColor: outOfRangeBarColor,
            transform: [{ translateX: -sliderWidth / 2 }, { scaleX: leftBarScaleX }, { translateX: sliderWidth / 2 }]
        }}/>
                <Animated.View style={{
            position: 'absolute',
            left: sliderWidth - knobSize / 4,
            width: knobSize / 2,
            height: knobSize / 3,
            borderRadius: knobSize / 3,
            backgroundColor: outOfRangeBarColor
        }}/>
                <PanGestureHandler onGestureEvent={onGestureEventFromValue} onHandlerStateChange={onHandlerStateChangeFromValue}>
                    {/*<Animated.View style={[styles.knob, {*/}
                    {/*    height: knobSize,*/}
                    {/*    width: knobSize,*/}
                    {/*    borderRadius: knobSize,*/}
                    {/*    backgroundColor: fromKnobColor,*/}
                    {/*    elevation: fromElevation,*/}
                    {/*    transform: [{translateX: translateXFromValue}]*/}
                    {/*}]}/>*/}
                    <Animated.View style={[styles.knob1, {
                backgroundColor: fromKnobColor,
                elevation: fromElevation,
                transform: [{ translateX: translateXFromValue }]
            }]}>
                        <Text style={styles.knobInnerDivider}>| | |</Text>
                    </Animated.View>
                </PanGestureHandler>
                <PanGestureHandler onGestureEvent={onGestureEventToValue} onHandlerStateChange={onHandlerStateChangeToValue}>
                    {/*<Animated.View style={[styles.knob, {*/}
                    {/*    height: knobSize,*/}
                    {/*    width: knobSize,*/}
                    {/*    borderRadius: knobSize,*/}
                    {/*    backgroundColor: toKnobColor,*/}
                    {/*    elevation: toElevation,*/}
                    {/*    transform: [{translateX: translateXtoValue}]*/}
                    {/*}]}/>*/}
                    <Animated.View style={[styles.knob1, {
                backgroundColor: toKnobColor,
                elevation: toElevation,
                transform: [{ translateX: translateXtoValue }]
            }]}>
                        <Text style={styles.knobInnerDivider}>| | |</Text>
                    </Animated.View>
                </PanGestureHandler>
            </View>
            {valueLabelsPosition === 'down'
            ? renderValueLabels()
            : null}
            {showRangeLabels
            ? <View style={{ width: '100%', flexDirection, justifyContent: 'space-between' }}>
                        <Text style={{ color: rangeLabelsTextColor, fontWeight: 'bold', fontSize }}>{min}</Text>
                        <Text style={{ color: rangeLabelsTextColor, fontWeight: 'bold', fontSize }}>{max}</Text>
                    </View>
            : null}
        </Animated.View>);
};
const getStyle = (knobSize) => {
    return StyleSheet.create({
        container: {
        // height: 100,
        // width: '100%'
        },
        knob: {
            position: 'absolute',
            elevation: 4
        },
        knob1: {
            height: knobSize,
            width: 2 * knobSize,
            left: -(0.5 * knobSize),
            borderRadius: 0.5 * knobSize,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4
        },
        knobInnerDivider: {
            marginHorizontal: 3 * knobSize / 40,
            fontSize: 18 * knobSize / 40,
            lineHeight: 18 * knobSize / 40,
            color: 'white'
        }
    });
};
