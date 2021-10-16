import React from 'react'
import { View,StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler';

const BookingCard = props => {
    return (
        <View
            style={styles.maincard}
        >
            <View
                style={styles.card}
            >
                <Text
                    style={{alignContent:'center',justifyContent:'center',fontSize:20,fontWeight:"bold"}}
                >{props.booking.title}</Text>
                <Text>
                    Paid: ₹{props.booking.paidamount}
                </Text>
                <TouchableOpacity
                    style={{
                        borderRadius:10,
                        height:30,
                        width:120,
                        backgroundColor:'#EE4F4F',
                        justifyContent:'center',
                        alignItems:'center',
                        elevation:5,
                    }}
                >
                    <Text
                        style={{color:'white',fontWeight:'bold'}}
                    >
                        GET INVOICE
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    maincard:{
        padding:10,

    },
    card:{
        borderRadius:10,
        backgroundColor:'#00ff00',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        elevation:5,
    }
});

BookingCard.propTypes = {
    booking : PropTypes.object,
}

export default BookingCard
