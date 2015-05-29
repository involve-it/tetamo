module.exports = require('react-native').StyleSheet.create({
    "listView": {
        "backgroundColor": "#FFFFFE"
    },
    "container": {
        "flex": 1,
        "flexDirection": "column",
        "justifyContent": "flex-start",
        "alignItems": "flex-start",
        "flexWrap": "nowrap",
        "backgroundColor": "transparent",
        "marginBottom": 5,
        "paddingTop": 0,
        "paddingBottom": 0,
        "paddingRight": 15,
        "paddingLeft": 15
    },
    "friendContainer": {
        "alignSelf": "flex-end",
        "borderWidth": 1,
        "borderRadius": 2,
        "borderColor": "transparent",
        "backgroundColor": "rgba(238,241,244,1)",
        "marginLeft": 60
    },
    "ownContainer": {
        "alignSelf": "flex-start",
        "borderWidth": 1,
        "borderColor": "rgba(222,222,222,1)",
        "borderRadius": 2,
        "marginRight": 60
    },
    "friendMessage": {
        "fontSize": 13,
        "paddingTop": 10,
        "paddingBottom": 10,
        "paddingRight": 10,
        "paddingLeft": 10
    },
    "ownMessage": {
        "paddingTop": 10,
        "paddingBottom": 10,
        "paddingRight": 10,
        "paddingLeft": 10,
        "fontSize": 13
    },
    "welcome": {
        "fontSize": 20,
        "textAlign": "center",
        "marginTop": 10,
        "marginBottom": 10,
        "marginRight": 10,
        "marginLeft": 10
    },
    "instructions": {
        "textAlign": "center",
        "marginBottom": 5
    }
});