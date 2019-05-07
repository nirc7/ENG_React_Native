import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const WSURL = 'http://ruppinmobile.tempdomain.co.il/site05/WSUsers.asmx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      txtName: '',
      txtPass: ''
    };
  }

  btnLogin = () => {
    //alert('hello ' + this.state.txtName);


    const data = {
      name:  this.state.txtName,// 'avi', //must be compatible with the WEB SERVICE parameters!!!
      pass: this.state.txtPass,// '1234'
    };

    fetch(WSURL + '/Login', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json;',
      }),
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log('res=', res);
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log("fetch POST.d= ", result.d);
          let u = JSON.parse(result.d);
          if (u != null) {
            console.log(u.ID);
            console.log(u.Name);
            console.log(u.Pass);
            alert('yep');
          } else {
            alert('no such user!');
          }

        },
        (error) => {
          console.log("err post=", error);
        });

  }

  txtNameCahnged = (e) => {
    this.setState({ txtName: e });
  }

  txtPassCahnged = (e) => {
    this.setState({ txtPass: e });
  }

  render() {
    return (
      <ThemeProvider>
        <View style={styles.container}>

          <Text style={{ backgroundColor: 'lightgrey', fontSize:30, color:'green'}}>Ruppin Login</Text>

          <View style={styles.txtInp} >
            <TextInput onChangeText={this.txtNameCahnged} ></TextInput>
          </View>
          <View style={styles.txtInp} >
            <TextInput onChangeText={this.txtPassCahnged} ></TextInput>
          </View>

          <Button
              icon={
                <Icon
                  name="sign-in" //https://www.bountyjobs.com/font-awesome/
                  size={25}
                  color="lightgrey"
                />
              }
              iconRight
              title="  Login"
              onPress={this.btnLogin}
            />
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
    padding: 25
  },
  txtInp:{
     borderColor: 'black',
      borderWidth: 1 ,
      margin:10,
      padding:10,
      fontSize:50,
      width:200,
      borderRadius:10
  }
});
