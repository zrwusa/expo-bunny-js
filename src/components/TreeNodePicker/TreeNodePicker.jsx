import { IcoMoon, Text, TextButton, View } from '../UI';
import { Col, ModalFromRight, Row } from '../../containers';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useBunnyKit } from '../../hooks/bunny-kit';
import { getSharedStyles } from '../../helpers';
import { makeStyles } from './styles';
import { FlatList, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { InlineSelector } from '../InlineSelector';
import { Searchbar } from 'react-native-paper';
import { firebase } from '../../firebase/firebase';
import { useIsMounted } from '../../hooks/is-mounted';
import { uuidV4 } from '../../utils';
export const TreeNodePicker = (props) => {
    const { sizeLabor, themeLabor, wp } = useBunnyKit();
    const { sharedStyles } = getSharedStyles(sizeLabor, themeLabor);
    const styles = makeStyles(sizeLabor, themeLabor);
    const isMounted = useIsMounted();
    const { dataMode = 'local', onDone, onCancel, titles = ['title0', 'title1', 'title2'], initialTreeNode, data = dataMode === 'local' ? [] : undefined, level = 0, childrenKeys = ['children', 'children', 'children'], collectionPaths = ['collection0', 'collection1', 'collection1'], conditions = dataMode === 'firestore' ? [['', '==', ''], ['category', '==', '$code']] : undefined, condition = dataMode === 'local' ? undefined : ['', '==', ''], leafLevel = 1, keyExtractors = ['id', 'id', 'id'], currentNodes, displayFields = ['name', 'name', 'name'] } = props;
    const [currentNodesState, setCurrentNodesState] = useState(level !== 0 ? currentNodes : new Array(leafLevel));
    const [orgData, setOrgData] = useState(data);
    const [filterData, setFilterData] = useState(orgData);
    const [children, setChildren] = useState(undefined);
    const childrenLevel = level + 1;
    const _reset = () => {
    };
    const title = titles[level];
    const childrenKey = childrenKeys[level];
    const collectionPath = collectionPaths[level];
    const keyExtractor = keyExtractors[level];
    const displayField = displayFields[level];
    const [childrenCondition, setChildrenCondition] = useState();
    useEffect(() => {
        (async () => {
            if (dataMode === 'firestore' && isMounted) {
                const collectionRef = firebase
                    .firestore()
                    .collection(collectionPath);
                let snapshot;
                if (JSON.stringify(condition) !== JSON.stringify(['', '==', ''])) {
                    snapshot = await collectionRef
                        .where(...condition)
                        .get();
                }
                else {
                    snapshot = await collectionRef
                        .get();
                }
                let data = [];
                snapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                setOrgData(data);
                setFilterData(data);
            }
        })();
    }, []);
    const treeNodePress = async (treeNode) => {
        // TODO when child selected,this should not be called
        const newState = [...currentNodesState];
        newState[level] = treeNode;
        switch (dataMode) {
            case 'local':
                if (treeNode?.[childrenKey]) {
                    setChildren(treeNode[childrenKey]);
                    setIsShowChildrenModal(true);
                }
                else {
                    setChildren(undefined);
                    onDone?.(newState);
                }
                break;
            case 'firestore':
                const condition = conditions?.[childrenLevel];
                const $key = condition?.[2].split('$')[1];
                const fieldPath = condition?.[0];
                const filterOp = condition?.[1];
                setCurrentNodesState(newState);
                if (level === leafLevel) {
                    onDone?.(newState);
                }
                else {
                    if (fieldPath && filterOp && $key) {
                        setChildrenCondition([fieldPath, filterOp, treeNode[$key]]);
                        setChildren([]);
                        setIsShowChildrenModal(true);
                    }
                }
                break;
        }
    };
    const [isShowChildrenModal, setIsShowChildrenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = (searchQuery) => {
        setSearchQuery(searchQuery);
    };
    useEffect(() => {
        const filterData = searchQuery.trim()
            ? orgData?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : orgData;
        setFilterData(filterData);
    }, [searchQuery]);
    return <SafeAreaView style={[styles.container]}>
        <View style={styles.header}>
            <Row>
                <Col>
                    <TextButton onPress={() => {
            onCancel?.();
        }}><IcoMoon name="x"/></TextButton>
                </Col>
                <Col align="center"><Text>{title}</Text></Col>
                <Col align="flex-end"><TextButton onPress={_reset}>
                    <Text style={sharedStyles.text2}>Reset</Text>
                </TextButton>
                </Col>
            </Row>
        </View>
        <View style={styles.content}>
            <View style={{ flex: 1, marginBottom: wp(10) }}>
                <KeyboardAvoidingView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        }} behavior="padding" enabled keyboardVerticalOffset={wp(100)}>

                    <FlatList style={{ flex: 1, marginBottom: wp(10) }} data={filterData} 
    // TODO
    keyExtractor={item => {
            // @ts-ignore
            return item[keyExtractor]?.toString() || uuidV4();
        }} initialNumToRender={2} windowSize={3} renderItem={({ item }) => {
            return <InlineSelector textAlign="flex-start" columns={[0, 9, 1]} onPress={async () => {
                    await treeNodePress(item);
                }} renderText={() => item?.[displayField]?.toString() || ''} isShowChevron={dataMode === 'local' ? !!item.children : level !== leafLevel}/>;
        }}/>
                    <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery}/>
                </KeyboardAvoidingView>
                {(dataMode === 'local' && children) || (dataMode === 'firestore' && children)
            ? <ModalFromRight isVisible={isShowChildrenModal} onVisibleChanged={isVisible => {
                    setIsShowChildrenModal(isVisible);
                }}>
                            <TreeNodePicker condition={childrenCondition} data={dataMode === 'local' ? children : undefined} level={childrenLevel} onDone={(result) => {
                    setIsShowChildrenModal(false);
                    onDone?.(result);
                }} onCancel={() => {
                    setIsShowChildrenModal(false);
                }} currentNodes={currentNodesState} leafLevel={leafLevel} dataMode={dataMode} titles={titles} collectionPaths={collectionPaths} conditions={conditions} keyExtractors={keyExtractors} initialTreeNode={initialTreeNode} displayFields={displayFields}/>
                        </ModalFromRight>
            : null}
            </View>
        </View>
        {/*<View style={[styles.footer]}>*/}
        {/*    <ButtonTO onPress={() => {*/}
        {/*        onDone?.(treeNode)*/}
        {/*    }}><InButtonText>Done</InButtonText></ButtonTO>*/}
        {/*</View>*/}
    </SafeAreaView>;
};
