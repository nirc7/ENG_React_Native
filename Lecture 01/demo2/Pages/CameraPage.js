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
        this.uploadDirURL = 'uploadFiles/';
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    btnSnap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 0.1 });
            alert(`${photo.uri} ,\n ${photo.width},\n ${photo.height} `);
            this.setState({ photoUri: photo.uri });
        }
    };


    btnUploadPictureFromCamera = () => {
        let img = this.state.photoUri;
        let imgName = 'imgFromCamera.jpg';
        this.imageUpload(img, imgName);
    }

    imageUpload = (imgUri, picName) => {
        this.setState({ animate: true });
        //let im = require('./assets/coldplay.jpg');
        let urlAPI = "http://ruppinmobile.tempdomain.co.il/site01/uploadpicture";
        //let urlAPI = "http://proj.ruppin.ac.il/igroup96/test1/uploadpicture";
        let dataI = new FormData();
        dataI.append('picture', {
          uri: imgUri,
          name: picName,
          type: 'image/jpg'
        });
    
        // Create the config object for the POST
        // You typically have an OAuth2 token that you use for authentication
        const config = {
          method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //    'Content-Type': 'multipart/form-data;',
        //   //   'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
        //    },
          body: dataI,
        }
    
        fetch(urlAPI, config)
          .then((responseData) => {
            // Log the response form the server
            let res = responseData._bodyText;
            let picNameWOExt = picName.substring(0, picName.indexOf("."));
            let imageNameWithGUID = res.substring(res.indexOf(picNameWOExt), res.indexOf(".jpg") + 4);
            console.log(
              `responseData= ${responseData} 
              responseData.status=  ${responseData.status}
              responseData._bodyText=${responseData._bodyText}
              imageNameWithGUID=${imageNameWithGUID}`);
    
            if (responseData.status == 201) {
              this.setState({
                uplodedPicUri: { uri: this.uploadDirURL + imageNameWithGUID },
                animate: false
              });
    
              alert(`uploaded successfully!
              ${this.uploadDirURL + imageNameWithGUID}`);
            }
            else {
              alert('error uploding ...');
              this.setState({
                uplodedPicUri: require('../assets/icon.png'),
                // animate: false
              });
            }
          })
          .catch(err => {
            alert('err upload= ' + err);
          })
      }

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
                                style={{ width: 50, height: 50 }}
                                source={require('../assets/shutter.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ width: 100 }}
                            onPress={this.btnUploadPictureFromCamera}>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require('../assets/upload_image.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../assets/placeHolder.png')}
                        />
                    </View>
                    <View >
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={{ uri: this.state.photoUri }}
                        />
                    </View>
                </View>
            );
        }
    }
}