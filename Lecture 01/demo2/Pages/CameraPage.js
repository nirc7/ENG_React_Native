import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraPage extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photoUri: '../assets/placeHolder.png'
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    btnSnap = async () => {
        alert(1);
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          alert(`${photo.uri} ,  ${photo.width}, ${photo.height} `);
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => { this.camera = ref; }}
                        style={{ flex: 0.5 }}
                        type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <View>
                        <TouchableOpacity
                            style={{ width: 100 }}
                            onPress={this.btnSnap}>
                            <Image

                                source={require('../assets/shutter.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image 
                            style={{flex:1 , width:150}}
                            source={{ uri: this.state.photoUri }}
                        />
                    </View>
                </View>
            );
        }
    }
}