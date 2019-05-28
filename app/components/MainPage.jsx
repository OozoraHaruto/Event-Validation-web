import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
var QRCode = require('qrcode')

export class MainPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      imgLink: ""
    }
  }

  componentDidMount(){
    var that = this;
    var obj1 = {
      eventName: "Jogging at 10pm",
      date: "16/10/2019,22/9/2019",
      website: "http://www.oozorataiyo.com",
    }
    var obj2 = {
      eventName: "はるはのチックトック動画を見ています",
      date: "16/11/2018-22/9/2019",
      website: "http://vt.tiktok.com/JAXNDx/",
    }
    var obj3 = {
      eventName: "I love 天月-あまつき- songs",
      date: "16/02/2019-22/9/2019",
      website: "https://twitter.com/_amatsuki_",
    }
    var additionalData = {
      version: 1.0,
      generator: 2,
      prime: 2,
      hash: "?"
    }
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 1
      }
    }
    var obj = this.encryptData(obj3);
    console.log(this.decryptData(obj))
    var objText = {
      e: obj.eventName,
      d: obj.date,
      w: obj.website,
      v: additionalData.version,
      g: additionalData.generator,
      p: additionalData.prime,
      h: additionalData.hash,
    };

    QRCode.toDataURL(JSON.stringify(objText), opts, function (err, url) {
      if (err) throw err

      that.setState({
        imgLink: url
      })
    })
  }

  encryptData = (obj) =>{
    obj.eventName   = this.asciiToHex(encodeURIComponent(obj.eventName));
    obj.date        = this.asciiToHex(encodeURIComponent(obj.date));
    obj.website     = this.asciiToHex(encodeURIComponent(obj.website));
    console.log(obj)

    return obj;
  }

  decryptData = (obj) =>{
    var tmp = {}
    tmp.eventName   = decodeURIComponent(this.hexToAscii(obj.eventName));
    tmp.date        = decodeURIComponent(this.hexToAscii(obj.date));
    tmp.website     = decodeURIComponent(this.hexToAscii(obj.website));

    return tmp;
  }

  asciiToHex = (tmp) =>{
    var str = '';
    for (var i = 0; i < tmp.length; i++) {
      str += tmp[i].charCodeAt(0).toString(16);
    }
    return str;
  }

  hexToAscii = (tmp) =>{
    var str = '';
    for (var n = 0; n < tmp.length; n += 2) {
      str += String.fromCharCode(parseInt(tmp.substr(n, 2), 16));
    }
    return str;
  }

  render(){
    var meta = {
      title: "Page Title"
    }
    var p10 = process.env.P_10.split(",");
    var {imgLink} = this.state;
    
    return(
      <DocumentMeta {...meta}>
        {imgLink == "" ? "Loading...": <img src={imgLink} />}<br/>
      </DocumentMeta>
    )
  }
}

export default MainPage;
