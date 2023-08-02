import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class CalcDisplay extends React.Component {

    static defaultProps = {
        display: "",
        color:'',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.pantalla, this.props.color]} >{this.props.display}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    pantalla: { fontSize: 70, textAlign: "right" }
})