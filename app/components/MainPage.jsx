import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
var QRCode = require('qrcode')
var bigInt = require("big-integer");

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
      eventName: "Malcolm website",
      date: "16/10/2019,22/9/2019,06/06/2019,24/06/2019",
      website: "http://www.ozorataiyo.com",
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
    var secrets = this.generateSecrets(10);
    var hash = "?"
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 1
      }
    }
    var obj = this.encryptDataObj(obj3, secrets);
    console.log("decrypt", this.decryptDataObj(obj, secrets))
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
    console.log(objText)
  }

  getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  generateSecrets = length =>{
    var secrets               = {};
    var startIndex            = 0;
    switch (length) {
      case 10: secrets.prime  = process.env.P_10.split(";"); break;
    
      default: secrets.prime  = process.env.P_10.split(";"); break;
    }

    secrets.pLength           = length;
    secrets.primeIndex        = this.getRandomInt(secrets.prime.length);
    secrets.prime             = secrets.prime[secrets.primeIndex];

    startIndex                = secrets.prime.indexOf("[")
    secrets.generator         = secrets.prime.substring(startIndex+1, secrets.prime.length-1).split(")");
    secrets.prime             = secrets.prime.substring(0, startIndex);
    secrets.generatorIndex    = this.getRandomInt(secrets.generator.length);
    secrets.generator         = secrets.generator[secrets.generatorIndex];

    startIndex                = secrets.generator.indexOf("(");
    secrets.private           = secrets.generator.substring(startIndex + 1, secrets.generator.length - 1).split(",");
    secrets.generator         = secrets.generator.substring(0, startIndex);
    secrets.privateAIndex     = this.getRandomInt(secrets.private.length);
    secrets.privateA          = secrets.private[secrets.privateAIndex];
    secrets.privateBIndex     = this.getRandomInt(secrets.private.length);
    secrets.privateB          = secrets.private[secrets.privateBIndex];

    secrets.publicA           = this.generatePublicKey(bigInt(secrets.prime), bigInt(secrets.generator), bigInt(secrets.privateA));
    secrets.publicB           = this.generatePublicKey(bigInt(secrets.prime), bigInt(secrets.generator), bigInt(secrets.privateB));

    return secrets;
  }

  encryptDataObj = (obj, secrets) =>{
    var sharedKey   = this.generateSharedKey(bigInt(secrets.privateA), bigInt(secrets.publicB), bigInt(secrets.prime));
    obj.eventName   = this.encryptData(obj.eventName, sharedKey, bigInt(secrets.prime), secrets.pLength);
    obj.date        = this.encryptData(obj.date, sharedKey, bigInt(secrets.prime), secrets.pLength);
    obj.website     = this.encryptData(obj.website, sharedKey, bigInt(secrets.prime), secrets.pLength);
    return obj;
  }

  encodeText = tmp => { //ASCII -> Hex -> Decimal
    tmp = encodeURIComponent(tmp)
    var str = '';
    for (var i = 0; i < tmp.length; i++) {
      var hex = tmp[i].charCodeAt(0).toString(16);
      str += ("0" + parseInt(hex[0], 16)).slice(-2);
      str += ("0" + parseInt(hex[1], 16)).slice(-2);
    }
    return str;
  }

  encryptData = (data, sharedKey, prime, pLength) => {
    var encryptedParts  = [];
    var encodedData     = this.encodeText(data);
    var currentLength   = 0;
    var mLength         = pLength - 1;
    var lastPartLength  = encodedData.length % mLength;
    do{
      var tmp           = ((bigInt(encodedData.substr(currentLength, mLength)).multiply(sharedKey)).divmod(prime)).remainder
      encryptedParts.push(this.Base64.fromNumber(tmp))
      currentLength += 9;
    }while(currentLength<encodedData.length)
    return (encryptedParts.toString() + ";" + ((lastPartLength == 0) ? mLength : lastPartLength));
  }

  decryptDataObj = (obj, secrets) =>{
    var sharedKey   = this.generateSharedKey(bigInt(secrets.privateB), bigInt(secrets.publicA), bigInt(secrets.prime))
    var tmp         = {}
    tmp.eventName   = this.decryptData(obj.eventName, sharedKey, bigInt(secrets.prime), secrets.pLength);
    tmp.date        = this.decryptData(obj.date, sharedKey, bigInt(secrets.prime), secrets.pLength);
    tmp.website     = this.decryptData(obj.website, sharedKey, bigInt(secrets.prime), secrets.pLength);
    return tmp;
  }

  decodeText = tmp =>{ //decimal -> Hex -> ASCII
    var str = '';
    for (var n = 0; n < tmp.length; n += 4) {
      var hex = parseInt(tmp.substr(n, 2)).toString(16) + parseInt(tmp.substr((n+2), 2)).toString(16)
      str    += String.fromCharCode(parseInt(hex, 16));
    }
    return decodeURIComponent(str);
  }

  decryptData = (cipherText, sharedKey, prime, pLength) => {
    var encryptedParts          = cipherText.split(",")
    var decryptedString         = "";
    var mLength                 = pLength - 1;
    var lastIndex               = encryptedParts.length - 1
    var lastPartLength          = encryptedParts[lastIndex].substr(encryptedParts[lastIndex].indexOf(";")+1);
    encryptedParts[lastIndex]   = encryptedParts[lastIndex].substr(0, encryptedParts[lastIndex].indexOf(";"))
    
    for (var i = 0; i < encryptedParts.length; i++) {
      var tmp = (bigInt(this.Base64.toNumber(encryptedParts[i])).multiply(bigInt(sharedKey).modInv(prime))).divmod(prime).remainder.value.toString();
      while(tmp.length < (i == lastIndex ? lastPartLength : mLength)){
        tmp = "0" + tmp;
      }
      decryptedString += tmp;
    }
    return this.decodeText(decryptedString);
  }

  Base64 = {
    _Rixits:
      //   0       8       16      24      32      40      48      56     63
      //   v       v       v       v       v       v       v       v      v
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",

    fromNumber: function (number){
      number            = number.toString();
      var result        = "";
      var currentIdx    = 0;

      do{
        var numComb     = parseInt(number.substr(currentIdx, 2));
        if (numComb < 10 || numComb > 63) 
          result       += number[currentIdx++];
        else {
          result       += this._Rixits[numComb];
          currentIdx   += 2;
        }
      } while (number.length > currentIdx);
      return result;
    },
    toNumber: function (rixits){
      var result        = "";
      for(var i=0; i<rixits.length;i++) 
        result         += this._Rixits.indexOf(rixits[i]);
      return result;
    }
  }

  generatePublicKey = (p, g, privateKey) => g.modPow(privateKey, p).value;

  generateSharedKey = (user1Prik, user2Pubk, p) => user2Pubk.modPow(user1Prik, p).value;

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
