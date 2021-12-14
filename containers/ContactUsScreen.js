import React from "react";
import { Button, Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar, Pressable, ScrollView } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons'



export default function ContactUsScreen({ setToken }) {


    return (
        <ScrollView style={{ flex: 1, padding: 1 }}>
            <View style={{ padding: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 22, padding: 10 }}>{"<"}-Get in touch with us-{">"}</Text>
                <View style={{ margin: 5, backgroundColor: 'black', alignItems: 'center', paddingBottom: 10, width: "100%",borderRadius:10 }}>
                    <Text style={{ fontSize: 22, color:'white', padding: 10, fontWeight:'bold'}}>
                        Office Address
                    </Text>
                    <View style={{backgroundColor: "#f5c542", padding: 10, margin: 10, width: '90%', borderRadius: 10 ,elevation:20,}}>
                        <Text style={{ fontSize: 22, margin: 10, }}>Plot No. 206, Sector-B, N-1, Cidco, Aurangabad, Maharashtra 431 001</Text>
                    </View>
                </View>
                {/* <Text style={{ fontSize: 28,padding:10 }}>{"<"}-Get in touch with us-{">"}</Text> */}
                <View style={{ margin: 5, backgroundColor: 'black', alignItems: 'center', paddingBottom: 10, paddingTop: 10, width: "100%" }}>
                    <Text style={{ fontSize: 22,color:'white', padding: 10, fontWeight:'bold'}}>
                        Email Address
                    </Text>
                    <View style={{backgroundColor: "#f5c542", padding: 10, margin: 10, width: '90%', borderRadius: 10,elevation:20, }}>
                        <Text style={{ fontSize: 22, margin: 10,color:'black' }}>hello@kaarobaar.co.in
                            info@kaarobaar.co.in</Text>
                    </View>
                </View>
                {/* <Text style={{ fontSize: 28,padding:10 }}>{"<"}-Get in touch with us-{">"}</Text> */}
                <View style={{ margin: 5, backgroundColor: 'black', alignItems: 'center', paddingBottom: 10, width: "100%" }}>
                    <Text style={{ fontSize: 22, padding: 10,color:'white', fontWeight:'bold'}}>
                        Call/Whatsapp
                    </Text>
                    <View style={{ backgroundColor: "#f5c542", padding: 10, margin: 10, width: '90%', borderRadius: 10,elevation:20, }}>
                        <Text style={{ fontSize: 22, margin: 10, }}>(+91) 9082-555-082                (+91) 8329-896-665</Text>
                    </View>
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