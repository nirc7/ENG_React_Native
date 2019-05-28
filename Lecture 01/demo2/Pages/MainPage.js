import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class MainPage extends Component {
    constructor(props) {
        super(props);
        //this.state = {  }
    }

    render() {
        return (
            <View style={{flex:1,  
                alignItems: 'center',
                justifyContent: 'center',}}>
                <Text>main</Text>
                
                <View style={{ width: 50 }}>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('MapPage'); }}>
                    <Image
                        source={require('../assets/map.png')}
                    />
                </TouchableOpacity>
                </View>
                
                <View>
                <TouchableOpacity
                    style={{ width: 50 }}
                    onPress={() => { this.props.navigation.navigate('PlacesPage'); }}>
                    <Image

                        source={require('../assets/places.png')}
                    />
                </TouchableOpacity>
                </View>
               
                <View>
                <TouchableOpacity
                    style={{ width: 50 }}
                    onPress={() => { this.props.navigation.navigate('CameraPage'); }}>
                    <Image

                        source={require('../assets/camera.png')}
                    />
                </TouchableOpacity>
                </View>
               
                <View>
                <TouchableOpacity
                    style={{ width: 50 , height:50}}
                    onPress={() => { this.props.navigation.navigate('PushPage'); }}>
                    <Image
                        source={require('../assets/push2.png')}
                    />
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}



export default MainPage;