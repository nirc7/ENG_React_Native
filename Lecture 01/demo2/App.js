import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


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
      <ThemeProvider>
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={{ backgroundColor: 'red' }}>demo~{"\n"} ruppin</Text>
          </View>
          <View style={styles.container}>
            <TextInput onChangeText={this.txtNameCahnged} ></TextInput>
          </View>
          <View style={styles.container}>
            <Button title='hello btn' onPress={this.btnHello}></Button>
          </View>
          <View style={styles.container}>
            <Button
              success
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                />
              }
              title="Button with icon component"
              type='outline'
            />
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                />
              }
              title="Button with icon component"
            />
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="white"
                />
              }
              iconRight
              title="Button with right icon"
            />
          </View>
        </View>
      </ThemeProvider>
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
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    padding: 5
  },
});
