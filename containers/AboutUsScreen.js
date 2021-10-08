import React from "react";
import { Button, Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar, Pressable, ScrollView, Image } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons'



export default function AboutUsScreen({ setToken }) {


    return (
        <ScrollView style={{ flex: 1, padding: 1 ,backgroundColor:'white'}}>
            <View style={{ padding: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 28, padding: 20, fontWeight: "bold" }}>About Kaarobaar</Text>
                <View >
                    <Image
                        style={{ height: 350, width: 300 }}
                        source={{ uri: 'https://kaarobaar.co.in/wp-content/uploads/elementor/thumbs/Common-Work-Space-2-scaled-p17c3gr9jtv2lf3ycn6mfbvifvklff9zi03vhr0s0i.jpg' }}
                    /></View>
                <View style={{margin:20,padding:10,alignItems:"center",width:"90%"}}>
                <Text style={{ fontSize: 22, margin: 20, width: 280 }}>
                    A bunch of solopreneurs tired of spending money on expensive coffees and working out of cafes with poor internet connection once met at a noisy event happening at a café.
                </Text>
                <Text style={{ fontSize: 22, margin: 10, width: 280,}}>
                    From there was born, KAAROBAAR – The Co-working Space for the entrepreneurs of an amazing tier-2 city of Aurangabad. What started as a place for our solo ventures soon became a space for young and dynamic entrepreneurs of city!
                </Text>
                </View>

            </View>



        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    Pressable: {
        padding: 20,
        backgroundColor: '#FFF',
        borderColor: "#F7DB15",
        borderWidth: 1,
        borderBottomEndRadius: 5



    },
    text: {

        fontSize: 18,
        padding: 5
    },
    icons: {
        padding: 5
    },
    rowitem: { flexDirection: "row" }
});