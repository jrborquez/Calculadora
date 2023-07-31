require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView } from 'react-native';
import { CalcButton, CalcDisplay } from '../components/index.js';


export default class CalculatorScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "0",
            switchValue: false,
        }
        //No se puede hacer uso del useState en una class
        //Iniciamos nuestro Cálculo
        
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();
    }

        //Cada aplastamos un boton se añade un dígito, tal y como viene en la librería SwissCalc
    onDigitPress = (digit) =>{
        this.calc.addDigit(digit);
        this.setState({ display: this.calc.getMainDisplay() });
    }

        //Para presionar los operadores binarios
    onBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() });

    }

        //para el boton de porcentaje que no es binario
    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() });
    }

        //Extraemos la función de la libreria de SwissCalc para hacer el Clear de nuestro display
    onClearPress = () => {
        this.calc.clear();
        this.setState({ display: this.calc.getMainDisplay() });
    }

        //de igual forma en la librería 
    onPlusMinusPress = () => {
        this.calc.negate();
        this.setState({ display: this.calc.getMainDisplay() });
    }

    onEqualsPress = () => {
        this.calc.equalsPressed();
        this.setState({ display: this.calc.getMainDisplay() });
    }

 
    render() {
    return(
    <SafeAreaView style={this.state.switchValue === false ? [styles.safearea, {backgroundColor:'black'}] : styles.safearea }>
       
        <View style={styles.container}>
            
                <View style={styles.switch}>
                    <Switch 
                    value={this.state.switchValue}  
                    onValueChange = {(switchValue)=>this.setState({switchValue})}
                    trackColor={{false: '#ff9e22', true: '#81b0ff'}}
                    thumbColor={this.state.switchValue ? "#FFAB00" : '#FFDFAA'}
                    ios_backgroundColor="#ff9e22"
                    />
                </View>

                <View style={styles.switch}>
                    <Text style={this.state.switchValue === false ? styles.texto1 : styles.texto2 }>{this.state.switchValue ? 'DayMode Calculator' :'NightMode Calculator' }</Text> 
                </View>  
                <View style= {styles.displayContainer} >
                    <CalcDisplay display={this.state.display} />
                </View>

                <View>
                    <View style={styles.buttonRow}>
                        <CalcButton onPress={()=>{ this.onClearPress()}} title="c" style={this.state.switchValue === false ? styles.dark1 : styles.light1 }/>
                        <CalcButton onPress={()=>{ this.onPlusMinusPress()}} title="+/-" style={this.state.switchValue === false ? styles.dark1 : styles.light1 }/>
                        <CalcButton onPress={()=>{ this.onUnaryOperatorPress(this.oc.PercentOperator) }}title="%" style={this.state.switchValue === false ? styles.dark1 : styles.light1 }/>
                        <CalcButton onPress={()=>{ this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title="÷" style={this.state.switchValue === false ? styles.dark2 : styles.light2 }/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={()=>{ this.onDigitPress("7")}} title="7" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onDigitPress("8")}} title="8" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onDigitPress("9")}} title="9" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onBinaryOperatorPress(this.oc.MultiplicationOperator) }} title="x" style={this.state.switchValue === false ? styles.dark2 : styles.light2 }/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={()=>{ this.onDigitPress("4")}} title="4" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onDigitPress("5")}} title="5" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onDigitPress("6")}} title="6" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onBinaryOperatorPress(this.oc.SubtractionOperator) }} title="-" style={this.state.switchValue === false ? styles.dark2 : styles.light2 }/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={()=>{ this.onDigitPress("1") }} title="1" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onDigitPress("2") }} title="2" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onDigitPress("3") }} title="3" style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onBinaryOperatorPress(this.oc.AdditionOperator) }} title="+" style={this.state.switchValue === false ? styles.dark2 : styles.light2 }/>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={()=>{ this.onDigitPress("0") }} title="0" style={this.state.switchValue === false ? styles.dark4 : styles.light4 }/>
                        <CalcButton onPress={()=>{ this.onDigitPress(".") }} title="." style={this.state.switchValue === false ? styles.dark3 : styles.light3 }/>
                        <CalcButton onPress={()=>{ this.onEqualsPress() }} title="=" style={this.state.switchValue === false ? styles.dark2 : styles.light2 }/>
                    </View>  
                </View>     
        </View>

    </SafeAreaView>
    );
}
}

const styles = StyleSheet.create({
    
    safearea: {
            backgroundSize: 'fill',
            height: '100%',
            width: '100%'
            },

    container: { 
            flex:1, 
            paddingBottom:10, 
            justifyContent:'center', 
            paddingTop: 20,
            },

    switch: { flexDirection: 'row',
            justifyContent: 'center'
            },
    
    texto1:  {
            fontSize: 20,
            paddingTop: 10,
            color: 'white'
            },

    texto2:  {
            fontSize: 20,
            paddingTop: 10,
            color: '#124BCE'
            },

    displayContainer: { 
            flex:1, 
            justifyContent: "flex-end",
            },
   

    buttonRow: { flexDirection: "row", 
            justifyContent: "space-between"
            },
            
            
    
    dark1: {
        color: '#757575',
        backgroundColor: "#BDBDBD"
        },
    dark2: {
        color: 'white',
        backgroundColor: "#ff9e22"
        },
    dark3: {
        color: 'white',
        backgroundColor: "#455A64"
        },
    dark4: {
        color: 'white',
        backgroundColor: "#455A64",
        flex:2,
            },
    light1: {
        color: 'FFDB90',
        backgroundColor: "#FFAB00"
        },
    light2: {
        color: 'white',
        backgroundColor: "#E43E00"
        },
    light3: {
        color: 'white',
        backgroundColor: "#124BCE",
        },
    light4: {
        color: 'white',
        backgroundColor: "#124BCE",
        flex:2
        },

});