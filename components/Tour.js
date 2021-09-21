import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import SwipeableViews from 'react-swipeable-views-native';
// There is another version using the scroll component instead of animated.
// I'm unsure which one give the best UX. Please give us some feedback.
// import SwipeableViews from 'react-swipeable-views-native/lib/SwipeableViews.scroll';

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1
    },
    slide: {
        padding: 15,
        flex: 1
        ,
        flexDirection: "column",
        justifyContent: "flex-end",

    },
    slide1: {
        backgroundColor: '#FEA900',
    },
    slide2: {
        backgroundColor: '#B3DC4A',
    },
    slide3: {
        backgroundColor: '#6AC0FF',
    },
    text: {
        color: '#fff',
        fontSize: 32,
    },
});

const MyComponent = (props) => (
    <SwipeableViews style={styles.slideContainer}>
        <View style={[styles.slide, styles.slide1]}>
            <Text style={styles.text}>
                slide n°1
            </Text>
        </View>
        <View style={[styles.slide, styles.slide2]}>
            <Text style={styles.text}>
                slide n°2
            </Text>
        </View>
        <View style={[styles.slide, styles.slide3]}>


            <Text style={styles.text}>
                slide n°3
            </Text>
            <Button onPress={() => { props.method(true)}} title='Get started' color="#841584" />

        </View>
    </SwipeableViews>
);

export default MyComponent;