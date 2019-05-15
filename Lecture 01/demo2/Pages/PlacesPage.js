import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Location, Permissions } from 'expo';

import { Button, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PlacesPage extends React.Component {
  constructor(props) {
    super(props);

    this.txtPlaceName = '';

    this.state = {
      txtName: '',
      location: null
    };
  }

  btnHello = () => {
    debugger;
    alert('hello ' + this.state.txtName);
  }

  txtNameCahnged = (e) => {
    this.setState({ txtName: e });
  }

  txtPlaceChanged = (e) => {
    this.txtPlaceName = e;
  }

  btnInsertPlace2DB = async () => {
    //opt1
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const output =
    //       'latitude=' + position.coords.latitude +
    //       '\nlongitude=' + position.coords.longitude +
    //       '\naltitude=' + position.coords.altitude +
    //       '\nheading=' + position.coords.heading +
    //       '\nspeed=' + position.coords.speed
    //     alert(output);
    //   },
    //   (error) => alert(error.message),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );


    //opt2
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location },
      () => {
        console.log(location.coords.longitude);
        alert(location.coords.longitude);
        this.btnReverseGC(location);
      });
  }

  btnReverseGC = async (location) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    if (location) {
      let reverseGC = await Location.reverseGeocodeAsync(location.coords);
      console.log('reverseGC', reverseGC[0].country);
      this.insertPlcaeIntoDB(location, this.txtPlaceName, reverseGC[0].country);
    } else {
      alert('You must push the Location button first in order to get the location before you can get the reverse geocode for the latitude and longitude!');
    }

  };

  insertPlcaeIntoDB = (location, placeName, placeAddress) => {
    const data = {
      placeName: placeName,
      lati: location.coords.latitude,
      longi: location.coords.longitude,
      address: placeAddress
    };

    fetch('http://ruppinmobile.tempdomain.co.il/site05/WebService.asmx/InsertPlace', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json;',
      }),
      body: JSON.stringify(data)
    })
      .then(res => {
        //console.log('res=', res);
        return res.json()
      })
      .then(
        (result) => {
          let res = JSON.parse(result.d);
          if (res == 1) {
            alert('success:)');
          }
          else { alert('err'); }
        },
        (error) => {
          console.log("err post=", error);
        });
  }

  render() {
    return (
      <ThemeProvider>
        <View style={styles.container}>
          <View style={styles.viewStyle}>
            <Text style={{ backgroundColor: 'red' }}>demo~{"\n"} ruppin</Text>
          </View>
          <View style={styles.txt}>
            <TextInput onChangeText={this.txtNameCahnged} ></TextInput>
          </View>
          <View style={styles.viewStyle}>
            <Button title='hello btn' onPress={this.btnHello}></Button>
          </View>

          <View style={styles.txt}>
            <TextInput onChangeText={this.txtPlaceChanged} ></TextInput>
          </View>
          <View style={styles.viewStyle}>
            <Button
              danger
              icon={
                <Icon
                  name="location-arrow"
                  size={15}
                  color="yellow"
                />
              }
              iconRight
              type="outline"
              title="  Save Places"
              onPress={this.btnInsertPlace2DB}
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
  viewStyle: {
    margin: 10,
    padding: 5
  },
  txt: {
    borderWidth: 2,
    borderColor: 'black',
    margin: 10,
    padding: 5
  }
});
