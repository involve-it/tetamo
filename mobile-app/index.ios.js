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
} = React;

var _ = require('lodash');
var DDPClient = require("ddp-client");

var tetamo = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    var ddpClient = new DDPClient({url: 'ws://10.0.0.6:3000/websocket'});

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
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{message.text}</Text>
        <Text style={styles.incompleteCount}>{message.timestamp}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  name: {
    flex: 5,
    fontSize: 18,
  },
  incompleteCount: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#2196F3',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('tetamo', () => tetamo);
