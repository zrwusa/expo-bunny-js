import React, { useEffect } from 'react';
import { Text } from '../../../components/UI';
import { Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Col, Row } from '../../../containers';
import { makeStyles } from './styles';
import { useBunnyKit } from '../../../hooks/bunny-kit';
import { isLoaded, useFirebaseConnect, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Avatar, Divider, InlineJump, Preparing } from '../../../components';
import dayJS from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { firestoreTimestampToDate } from '../../../utils';
dayJS.extend(isToday);
export function ChatHomeScreen({ route, navigation }) {
    const { sizeLabor, themeLabor, user, wp } = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    const firebaseUser = user?.firebaseUser;
    let userId = '';
    if (firebaseUser) {
        userId = firebaseUser.uid;
    }
    useFirebaseConnect([{ path: 'chatRooms', queryParams: [] }]);
    useFirestoreConnect([{
            collection: 'conversations', where: [
                ['users', 'array-contains', userId],
            ],
        }]);
    useFirestoreConnect([{ collection: 'users', }]);
    const conversations = useSelector((state) => state.firestoreState.ordered.conversations);
    const firestore = useFirestore();
    useEffect(() => {
        getCurrentUserConversationsMessages().then();
    }, [conversations]);
    const getCurrentUserConversationsMessages = async () => {
        if (conversations && (conversations.length > 0)) {
            const whereConversationIds = conversations.map(item => item.id);
            // TODO Invalid Query. 'in' filters support a maximum of 10 elements in the value array.
            await firestore.get({
                collection: 'chatMessages',
                orderBy: ['createdAt', 'desc'],
                // where: [
                //     ['conversationId', 'in', whereConversationIds],
                // ],
                storeAs: 'currentUserConversationsMessages'
            });
        }
    };
    const insets = useSafeAreaInsets();
    const users = useSelector((state) => state.firestoreState.ordered.users);
    const currentUserConversationsMessages = useSelector((state) => state.firestoreState.ordered.currentUserConversationsMessages);
    // TODO On web platform, when jumping from one sub-navigation to another sub-navigation, the back button does not work
    const handleRoomPress = (key) => {
        // navigation.navigate('DemoChat', {
        //     screen: 'ChatRoom',
        //     params: {
        //         conversationId: key,
        //     },
        // })
        // navigation.navigate('ChatRoom', {conversationId: key})
    };
    const renderAvatar = (conversation) => {
        switch (conversation.type) {
            case 'GROUP':
                return <Avatar size="l" isBorder={false} source={{ uri: conversation.avatar }}/>;
            case 'COUPLE':
                const otherUsersInConversation = users?.filter((user) => {
                    return conversation.users.includes(user.uid) && user.uid !== userId;
                });
                return (otherUsersInConversation && otherUsersInConversation[0] && otherUsersInConversation[0].photoURL)
                    ? <Avatar size="l" isBorder={false} source={{ uri: otherUsersInConversation[0].photoURL }}/>
                    : null;
        }
    };
    const renderLatestMessage = (conversation) => {
        const latestMessages = currentUserConversationsMessages?.filter((item) => {
            return (item.conversationId === conversation.id);
        });
        const latestMessage = latestMessages?.[0];
        let tipText = '';
        let tipTime = '';
        if (latestMessage) {
            const createdAtTimestamp = firestoreTimestampToDate(latestMessage.createdAt);
            const date = dayJS(createdAtTimestamp);
            const now = new Date();
            const isToday = date.isToday();
            const isSameWeek = date.isSame(now, 'week');
            tipTime = isToday ? date.format('LT') : isSameWeek ? date.format('ddd').toString() : date.format('MM/DD/YY');
            switch (latestMessage.type) {
                case 'MESSAGE':
                    tipText = latestMessage.text;
                    break;
                case 'IMAGE':
                    tipText = 'Image Message';
                    break;
                case 'STICKER_GIF':
                    tipText = 'Sticker Message';
                    break;
                case 'AUDIO':
                    tipText = 'Voice Message';
                    break;
                case 'VIDEO':
                    tipText = 'Video Message';
                    break;
                default:
                    break;
            }
        }
        return <>
            <Row style={styles.timePanel}>
                <Text>{conversation.name}</Text>
                <Text style={styles.time}>{tipTime}</Text>
            </Row>
            <Row style={styles.tipPanel}>
                <Text style={styles.tip}>{tipText}</Text>
            </Row>
        </>;
    };
    const renderItem = (conversation) => {
        return (<View style={styles.conversation}>
                <InlineJump type="LINK" to={`/demo-chat/chat-rooms/${conversation.id}`}>
                    <Row paddingVertical="m">
                        <Col size={1}>
                            {renderAvatar(conversation)}
                        </Col>
                        <Col size={5} style={styles.latestMessage}>
                            {renderLatestMessage(conversation)}
                        </Col>
                    </Row>
                </InlineJump>
                <Divider />
            </View>);
    };
    // React Navigation bug,when nested navigators and headerShown = false,
    // the FlatList height not limited,as such the scrolling does't work
    const webFlatListHeight = Dimensions.get('window').height - insets.top - insets.bottom - wp(46);
    return (<SafeAreaView style={{ flex: 1 }}>
            {isLoaded(conversations)
            ? <FlatList style={{ height: webFlatListHeight }} data={conversations} renderItem={({ item }) => {
                    return renderItem(item);
                }} keyExtractor={(item) => item.id}/>
            : <Preparing />}
        </SafeAreaView>);
}
