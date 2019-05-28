import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Notifications } from 'expo';

import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync'

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount() {
        registerForPushNotificationsAsync()
            .then(tok => {
                this.setState({ token: tok });
            });
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        this.setState({ notification: notification });
    };

    btnGetToken = async () => {
        alert(this.state.notification.data);
    }

    render() {
        return (
            <View>
                <Text>PUSH PAGE </Text>
                <Button title="GET TOKEN" onPress={this.btnGetToken}></Button>
            </View>
        );
    }
}

export default componentName;


