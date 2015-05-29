/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Component
    } = React;

var _ = require('lodash');
var DDPClient = require("ddp-client");
var styles = require('./AppTetamo/styles/main-style.js');

/***********************************/
var AppTetamo = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
            }),
            loaded: false,
        };
    },

    componentDidMount: function() {
        var ddpClient = new DDPClient({url: 'ws://192.168.1.2:3000/websocket'});

        ddpClient.connect(() => ddpClient.subscribe('messages'));

        // observe the lists collection
        var observer = ddpClient.observe("messages");
        observer.added = (a) => {
            //console.log('Message : ' + JSON.stringify(ddpClient.collections.messages));
            //console.log('asdf');
            //console.log('Messages: ' + JSON.stringify(ddpClient.collections.messages));
            this.updateRows(_.cloneDeep(_.values(ddpClient.collections.messages)));
            //console.log('asdf1');
        }
        //observer.changed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));
        //observer.removed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));

    },

    updateRows: function(rows) {
        //console.log('asdf2');
        //console.log('rows: ' + JSON.stringify(rows));
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rows),
            loaded: true,
        });
    },

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderList}
                style={styles.listView}
            />
        );
    },


    renderLoadingView: function() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading messages...
                </Text>
            </View>
        );
    },

    renderList: function(message) {
        if(message.keyMessage == 'friend-message') {
            return (
                <View style={styles.container}>
                    <View  style={styles.friendContainer}>
                        <Text style={styles.friendMessage}>{message.text}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View  style={styles.ownContainer}>
                    <Text style={styles.ownMessage}>{message.text}</Text>
                </View>
            </View>
        );
    }
});

/***********************************/

AppRegistry.registerComponent('AppTetamo', () => AppTetamo);

/*
 'use strict';

 var React = require('react-native');
 var {
 Text,
 View
 } = React;

 var styles = React.StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: 'red'
 }
 });

 class AppTetamo extends React.Component {
 render() {
 return (
 <View style={styles.container}>
 <Text>This is a simple application.</Text>
 </View>
 )
 }
 }

 React.AppRegistry.registerComponent('AppTetamo', () => AppTetamo);

 */