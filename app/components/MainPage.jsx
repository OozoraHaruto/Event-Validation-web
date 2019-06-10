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
    var now = new Date()
    const testObj = {
      eventName: "Thank you for coming to our website",
      date: `${now.getFullYear()}/${now.getMonth()}/${now.getDate()}-${now.getFullYear()+1}/10/16`
    }
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
      obj = encryptDataObj(testObj, secrets);
    } while (testObj.eventName != decryptDataObj(obj, secrets).eventName);
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
      title: "Home"
    }
    var {imgLink} = this.state;
    
    return(
      <DocumentMeta {...meta}>
        <div className="text-center">
          <h1 className="display-1">This is what we do</h1>
          {imgLink == "" ? "Loading..." : <img src={imgLink} />}
        </div>
      </DocumentMeta>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.authReducer
  }
})(MainPage);
