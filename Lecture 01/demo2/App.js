import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      txtName: ''
    };
  }

  btnHello = () => {
    debugger;
    alert('hello ' + this.state.txtName);
  }

  txtNameCahnged = (e) => {
    this.setState({ txtName: e });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{ backgroundColor: 'red' }}>demo ruppin</Text> 
        </View>
        <View style={styles.container}>
          <TextInput onChangeText={this.txtNameCahnged} ></TextInput> 
        </View>
        <View style={styles.container}>
          <Button title='hello btn' onPress={this.btnHello}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    borderWidth:2,
    borderColor:'black'
  },
});
