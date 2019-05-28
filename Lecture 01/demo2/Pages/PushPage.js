import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {  Notifications } from 'expo';

import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync'

class PushPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount() {
        registerForPushNotificationsAsync()
            .then(tok => {
                this.setState({ token: tok });
                console.log(tok);
            });
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        this.setState({ notification: notification });
        let res = notification.data;
        alert( `${res.name} -- ${res.grade}`);
    };

    btnGetToken = () => {
        console.log(this.state.notification.data);
    }

    btnSendPushFromClient = () => {
        let per = {
            to: this.state.token,
            title: 'title from client',
            body: "body from client side",
            badge: 3,
            data: { name: "nir", grade: 100 }
        };

        // POST adds a random id to the object sent
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            body: JSON.stringify(per),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json != null) {
                    console.log(`
                    returned from server\n
                    json.data= ${JSON.stringify(json.data)}`);

                } else {
                    alert('err json');
                }
            });
    }

    render() {
        return (
            <View>
                <Text>PUSH PAGE </Text>
                <View style={styles.btnContainer}>
                    <Button title="GET TOKEN" onPress={this.btnGetToken}></Button>
                </View>

                <View style={styles.btnContainer}>
                    <Button title="SEND PUSH FROM CLIENT" onPress={this.btnSendPushFromClient}></Button>
                </View>
            </View>
        );
    }
}

export default PushPage;

const styles = StyleSheet.create({
    btnContainer: {
        margin: 15,
        padding: 10,
    }
});


