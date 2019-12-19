import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity, TextInput} from 'react-native';
 import io from 'socket.io-client';

export default class App extends Component {
 state={
   color:'red',
   connectCounter:0
 }
 constructor(){
   super();
   this.socket=io("http://192.168.1.5:3000");
 }
 componentDidMount() {
  this.socket.on('countOfUsers',(a)=>{
    this.setState({
      connectCounter:this.socket.listeners.length
    });
  });
 }
 
 changeColor=()=>{
  this.socket.on('color code',(a)=>{
    this.setState({
      color:a
    })
 });
 this.socket.on('countOfUsers',(a)=>{
  this.setState({
    connectCounter:a
  });
});
 
  const ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
   this.socket.emit("color code",ColorCode);
  
 }
  render() {
    return (
      <TouchableOpacity 
      style={{backgroundColor:this.state.color,flex:1,justifyContent:'center',alignItems:'center'}}
      onPress={this.changeColor}
      >
    <Text style={styles.connectCounterText}>{this.state.connectCounter}</Text>

      <View >
    <Text style={styles.btnText}>{this.state.color}</Text>
        </View>
        </TouchableOpacity>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  button: {
    margin: 10,
  },
  btnText:{
    color:'white',
    fontSize:50,
  },
  connectCounterText:{
    top:0,
    position:"absolute",
    color:'white',
    fontSize:50
  }
});
