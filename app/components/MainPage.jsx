import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

var QRCode = require('qrcode')

import { generateSecrets, encryptDataObj, decryptDataObj } from 'EncryptionDecryption';

export class MainPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      imgLink: ""
    }
  }

  componentDidMount(){
    var that = this;
    const testObj = [
      {
        eventName: "Malcolm website",
        date: "16/10/2019,22/9/2019,06/06/2019,24/06/2019",
        website: "http://www.ozorataiyo.com",
      },
      {
        eventName: "はるはのチックトック動画を見ています",
        date: "16/11/2018-22/9/2019",
        website: "http://vt.tiktok.com/JAXNDx/",
      },
      {
        eventName: "I love 天月-あまつき- songs",
        date: "16/02/2019-22/9/2019",
        website: "https://twitter.com/_amatsuki_",
      }
    ]
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 1
      }
    }
    var hash = "?"
    const secrets = generateSecrets(10);
    var obj = {}
    do{
      obj = encryptDataObj(testObj[1], secrets);
    } while (testObj[1].eventName != decryptDataObj(obj, secrets).eventName);
    var objText = {
      e: obj.eventName,
      d: obj.date,
      w: obj.website,
      v: 1.0,                                   // QR version
      l: secrets.pLength,                       // Prime number length
      g: secrets.generatorIndex,                // Generator Index 
      p: secrets.primeIndex,                    // Prime Number Index
      y: secrets.publicA.toString(),            // Public Key
      k: secrets.privateBIndex,                 // Private Key
      h: hash,                                  // Hash of un encrypted data
    };

    QRCode.toDataURL(JSON.stringify(objText), opts, function (err, url) {
      if (err) throw err
      that.setState({ imgLink: url })
    })
  }

  render(){
    var meta = {
      title: "Page Title"
    }
    var {imgLink} = this.state;
    
    return(
      <DocumentMeta {...meta}>
        {imgLink == "" ? "Loading...": <img src={imgLink} />}<br/>
      </DocumentMeta>
    )
  }
}

export default MainPage;
