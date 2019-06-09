import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Formik } from 'formik';

var QRCode = require('qrcode')

import { generateSecrets, encryptDataObj, decryptDataObj } from 'EncryptionDecryption';
import QRInfoForm from 'app/components/forms/QRInfoForm';



export class GenerateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLink: ""
    }
  }

  handleFormSubmission = values => {
    var that              = this;
    const replaceDateDashToSlash = date => date.replace(/-/g, "/");
    const opts            = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 1
      }
    }
    var hash              = "?"
    const secrets         = generateSecrets(10);
    var obj               = {
      ...values,
      date: replaceDateDashToSlash(values.date.toString())
    }
    if(values.dateType == "Range"){
      obj.date            = obj.date.replace(",", "-")
    }
    do {
      obj                 = encryptDataObj(obj, secrets);
    } while (values.eventName != decryptDataObj(obj, secrets).eventName);
    var objText           = {
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

  render() {
    var meta = {
      title: "Generate QR Code"
    }
    var { imgLink }       = this.state;

    return (
      <DocumentMeta {...meta}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <h1 className="text-center">QR Generator</h1>
              <QRInfoForm handleFormSubmission={this.handleFormSubmission} />
            </div>
            <div className="col-12 col-md-6">
              {imgLink == "" ? "Submit form to generate QR Code" : <img src={imgLink} className="w-100" />}
            </div>
          </div>
        </div>
      </DocumentMeta>
    )
  }
}

export default GenerateQR;
