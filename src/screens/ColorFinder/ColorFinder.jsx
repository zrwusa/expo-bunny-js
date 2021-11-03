import React, {useState} from 'react';
import {ButtonTO, InButtonText, Text, TextInput, View} from '../../components/UI';
import {checkColor, colorFaultTolerance, deltaEDes, diffColors} from '../../utils/color';
import {ScrollView} from 'react-native';
import {getStyles} from './styles';
import {palette, uuidV4} from '../../utils';
import {Card, Col, Row} from '../../containers';
import {collectBLResult} from '../../store/actions';
import {blError} from '../../helpers';
import {useDispatch} from 'react-redux';
import {ColorTranslator} from 'colortranslator';
import {CopyableText} from '../../components/CopyableText';
import {ColorValuesCard} from '../../components/ColorValuesCard';
import {shortenTFunctionKey} from '../../providers';
import {Tab} from '../../components';
import {useBunnyKit} from '../../hooks';

export function ColorFinderScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.ColorFinder');
    const dispatch = useDispatch();
    const {themes} = themeLabor;
    const styles = getStyles(sizeLabor, themeLabor);
    const [inputText, setInputText] = useState('');
    const [colorInput, setColorInput] = useState({text: '', Hex: '', RGB: '', HSL: ''});
    const [similarColorsFromTheme, setSimilarColorsFromTheme] = useState([]);
    const [similarColorsFromPalette, setSimilarColorsFromPalette] = useState([]);
    const [uglyType, setUglyType] = useState('Beautiful');
    const formatUglyStringToRGB = (colorString) => {
        if (colorString && colorString.substring(0, 3).toLowerCase() !== 'rgb') {
            const escaped09 = escape(colorString).replaceAll('%09', ',');
            const escaped20 = escaped09.replaceAll('%20', ',');
            const truncated = escaped20.split(',').slice(0, 3).join(',');
            return `rgb(${truncated})`;
        } else {
            return colorString;
        }
    };
    const getIndexedColor = (themColorValue, colorKey, inputColorText, themeName, similarIndexed) => {
        const themeColor = colorFaultTolerance(themColorValue);
        if (themeColor && inputColorText) {
            const diff = diffColors(themeColor, inputColorText);
            const indexedColor = {
                keyInThemeColors: colorKey,
                Hex: ColorTranslator.toHEX(themeColor),
                RGB: ColorTranslator.toRGB(themeColor),
                HSL: ColorTranslator.toHSL(themeColor),
                diff: diff,
                diffDes: deltaEDes(diff),
                themeName
            };
            similarIndexed.push(indexedColor);
        }
    };
    const getSimilarColor = () => {
        const inputColorText = colorFaultTolerance(colorInput.text);
        const checkColorResult = checkColor(inputColorText);
        if (!checkColorResult.isColor) {
            dispatch(collectBLResult(blError('Not a color string', true)));
            return;
        }
        const themesKeys = Object.keys(themes);
        let _similarColorsFromTheme = [];
        let _similarColorsFromPalette = [];
        themesKeys.forEach((themeName) => {
            const theme = themes[themeName];
            const {colors} = theme;
            const similarIndexed = [];
            const colorKeys = Object.keys(colors);
            colorKeys.forEach((colorKey) => {
                const themColorValue = colors[colorKey];
                if (themColorValue instanceof Array) {
                    // todo
                    // themColorValue.forEach((value: string,index) => {
                    //     getIndexedColor(value, colorKey+`[${index}]`, inputColorText, themeName, similarIndexed)
                    // })
                } else {
                    getIndexedColor(themColorValue, colorKey, inputColorText, themeName, similarIndexed);
                }
            });
            const sortedSimilarIndexed = similarIndexed.sort((a, b) => {
                return a.diff - b.diff;
            });
            const similarObj = sortedSimilarIndexed[0];
            _similarColorsFromTheme.push(similarObj);
            // _similarColorsFromTheme.push(sortedSimilarIndexed[1]);
            // _similarColorsFromTheme.push(sortedSimilarIndexed[2]);
            // _similarColorsFromTheme.push(sortedSimilarIndexed[3]);
        });
        setSimilarColorsFromTheme(_similarColorsFromTheme);
        const similarIndexedPalette = [];
        const colorPaletteKeys = Object.keys(palette);
        colorPaletteKeys.forEach((colorKey) => {
            const paletteColor = colorFaultTolerance(palette[colorKey]);
            if (paletteColor && inputColorText) {
                const diff = diffColors(paletteColor, inputColorText);
                const indexedColor = {
                    keyInPalette: colorKey,
                    Hex: ColorTranslator.toHEX(paletteColor),
                    RGB: ColorTranslator.toRGB(paletteColor),
                    HSL: ColorTranslator.toHSL(paletteColor),
                    diff: diff,
                    diffDes: deltaEDes(diff),
                };
                similarIndexedPalette.push(indexedColor);
            }
        });
        const sortedSimilarIndexedPalette = similarIndexedPalette.sort((a, b) => {
            return a.diff - b.diff;
        });
        const similarObjPalette = sortedSimilarIndexedPalette[0];
        _similarColorsFromPalette.push(similarObjPalette);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[1]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[3]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[4]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[5]);
        _similarColorsFromPalette.push(sortedSimilarIndexedPalette[6]);
        setSimilarColorsFromPalette(_similarColorsFromPalette);
    };
    const handleSimilarColor = () => {
        getSimilarColor();
    };
    const handleChangeTextFrom = (text) => {
        setInputText(text);
        let beautiful = '';
        switch (uglyType) {
            case 'RGB':
                beautiful = formatUglyStringToRGB(text);
                break;
            default:
                beautiful = text;
                break;
        }
        let _text = colorFaultTolerance(beautiful);
        if (_text) {
            setColorInput({
                text: _text,
                Hex: ColorTranslator.toHEX(_text),
                RGB: ColorTranslator.toRGB(_text),
                HSL: ColorTranslator.toHSL(_text),
            });
        } else {
            setColorInput({
                text: '',
                Hex: '',
                RGB: '',
                HSL: ''
            });
        }
    };
    const handleKeyPress = ({nativeEvent}) => {
        if (nativeEvent.key === 'Enter') {
            getSimilarColor();
        }
    };
    return (<ScrollView>
        <View style={styles.container}>
            <Card titleMode="OUT" title={st('colorInput')}>
                <Tab items={['Beautiful', 'RGB', 'Hex', 'HSL']} value={uglyType} onChange={(item) => {
                    setUglyType(item);
                }}/>
                <Row paddingVertical="l">
                    <Col size={30}>
                        <TextInput style={styles.input} value={inputText} placeholder={st('inputAColorString')}
                                   onChangeText={handleChangeTextFrom} onKeyPress={handleKeyPress}
                                   autoCapitalize="none"/>
                    </Col>
                    <Col size={2}/>
                    <Col size={20}>
                        <ButtonTO onPress={handleSimilarColor}>
                            <InButtonText>{st('findSimilarColors')}</InButtonText>
                        </ButtonTO>
                    </Col>
                </Row>
                <ColorValuesCard item={colorInput}/>

            </Card>
            <Card titleMode="OUT" title={st('similarColorFromPalette')}>
                {similarColorsFromPalette.map(similarColorItem => {
                    return <View key={similarColorItem.keyInPalette}>
                        <Row paddingVertical="xs" style={styles.row}>
                            <Text>Diff</Text>
                            <Text>{similarColorItem.diff.toFixed(2)}</Text>
                        </Row>
                        <Row paddingVertical="xs" style={styles.row}>
                            <Text>Diff Tip</Text>
                            <Text>{similarColorItem.diffDes}</Text>
                        </Row>
                        <Row paddingVertical="xs" style={styles.row}>
                            <Text>Key</Text><CopyableText>{similarColorItem.keyInPalette}</CopyableText>
                        </Row>
                        <ColorValuesCard item={similarColorItem}/>
                    </View>;
                })}
            </Card>
            <Card titleMode="OUT" title={st('similarColorsFromThemes')}>
                {similarColorsFromTheme.map(similarColorItem => {
                    return <View key={uuidV4()}>
                        <Row paddingVertical="m" style={styles.row}>
                            <Text>Diff</Text>
                            <Text>{similarColorItem.diff.toFixed(2)}</Text>
                        </Row>
                        <Row paddingVertical="m" style={styles.row}>
                            <Text>Diff Tip</Text>
                            <Text>{similarColorItem.diffDes}</Text>
                        </Row>
                        <Row paddingVertical="m" style={styles.row}>
                            <Text>Theme</Text><Text>{similarColorItem.themeName}</Text>
                        </Row>
                        <Row paddingVertical="m" style={styles.row}>
                            <Text>Key</Text><CopyableText>{similarColorItem.keyInThemeColors}</CopyableText>
                        </Row>
                        <ColorValuesCard item={similarColorItem}/>
                    </View>;
                })}
            </Card>
        </View>
    </ScrollView>);
}
