import React, { Component } from 'react';
import { View,Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';


export class ShareSheet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{width: "100%",height: "100%",position: "absolute",top: 0, left: 0, flex : 1, justifyContent : "center", alignItems : "center"}}>
        <View style={{width: "60%", backgroundColor : "white",justifyContent : "center", alignItems : "center"}}>
          <View style={{marginTop : 40}}>
            <Text style={{textAlign : "center"}}>{this.props.shareTitle}</Text>
          </View>
          <View style={{marginTop : 15, flexDirection : "row"}}>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

export class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TouchableOpacity 
        style={{width: 75, height: 125, margin: 7.5}}
        onPress={this.props.onPress}
      >
        <View style={{width : 75, height : 75}}>
          <Image
            source={this.props.iconSrc}
            style={{width : 50, height : 50, margin : 12.5}}
          />
        </View>
        <View style={{width : 75, height : 45, marginBottom : 15}}>
          <Text style={{textAlign : "center"}}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default {
  shareSingle : function(options){
    var url = null;

    if(options.social == "email"){
      url = "mailto:?subject="+encodeURIComponent(options.subject)+"&body="+encodeURIComponent(options.message + "\n\n" + options.url + "\n");
    }

    if(options.social == "whatsapp"){
      url = "whatsapp://send?text="+ encodeURIComponent(options.message + "\n\n" + options.url + "\n");
    }

    var win = window.open(url, '_self');
    win.focus();

    return new Promise((resolve, reject) => {
        resolve();
    });
  }
}