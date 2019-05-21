import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.front,
            photoUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        };

    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    btnSnap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            alert(`${photo.uri} ,\n ${photo.width},\n ${photo.height} `);
            this.setState({photoUri: photo.uri});
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
                                style={{width: 50, height: 50}}
                                source={require('../assets/shutter.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Image
                            style={{width: 50, height: 50}}
                            source={require('../assets/placeHolder.png')}
                        />
                    </View>
                    <View >
                        <Image
                            style={{width: 150, height: 150}}
                            source={{ uri: this.state.photoUri }}
                        />
                    </View>
                </View>
            );
        }
    }
}