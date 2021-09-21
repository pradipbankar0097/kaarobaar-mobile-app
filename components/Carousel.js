import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-x2-carousel';

const DATA = [
    { text: '#1' },
    { text: '#2' },
    { text: '#3' },
];

const MyCarousel = () => {
    const renderItem = data => (
        <View key={data.text} style={styles.item}>
            <Text>{data.text}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <Carousel
                pagination={Pagination}
                renderItem={renderItem}
                autoplay={true}
                autoplayInterval={1000}
                data={DATA}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        width: 400,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbf3fa',
    },
});

export default MyCarousel;