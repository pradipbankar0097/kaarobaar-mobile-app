import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    Image,
    ImageBackground,
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
        padding: 0,
        flex: 1
        ,
        height: '100%',
        width: '100%',
        flexDirection: "column",
        justifyContent: "flex-end",
        position: 'absolute'

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    backgroundContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    bakcgroundImage: {
        flex: 1,
        width: null,
        height: null
    },
    loginButton: {
        marginBottom: 20,
        width: '100%'
    }
});

const MyComponent = (props) => (
    <SwipeableViews style={styles.slideContainer}>
        <View style={[styles.slide, styles.slide1]}>
            <Image style={styles.bakcgroundImage} source={require('../assets/tour_images/img.png')} />


        </View>


        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <Image style={styles.bakcgroundImage} source={require('../assets/tour_images/img1.png')} />
            </View>
            <View style={styles.loginButton}>
                <Button onPress={() => { props.method(true) }} title='Get started' color="grey" />

            </View>
        </View>
    </SwipeableViews>
);

export default MyComponent;