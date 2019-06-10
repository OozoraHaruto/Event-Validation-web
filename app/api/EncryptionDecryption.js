var bigInt                    = require("big-integer");

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

export const generateSecrets = length => {
  var secrets                 = {};
  var startIndex = 0;
  switch (length) {
    case 10:
      secrets.prime           = process.env.P_10.split(";");
      break;

    default:
      secrets.prime           = process.env.P_10.split(";");
      break;
  }

  secrets.pLength             = length;
  secrets.primeIndex          = getRandomInt(secrets.prime.length-1);
  secrets.prime               = secrets.prime[secrets.primeIndex];

  startIndex                  = secrets.prime.indexOf("[")
  secrets.generator           = secrets.prime.substring(startIndex + 1, secrets.prime.length - 1).split(")");
  secrets.prime               = secrets.prime.substring(0, startIndex);
  secrets.generatorIndex      = getRandomInt(secrets.generator.length-1);
  secrets.generator           = secrets.generator[secrets.generatorIndex];

  startIndex                  = secrets.generator.indexOf("(");
  const privateKeys           = secrets.generator.substring(startIndex + 1, secrets.generator.length - 1).split(",");
  secrets.generator           = secrets.generator.substring(0, startIndex);

  do{
    secrets.privateAIndex     = getRandomInt(privateKeys.length);
    secrets.privateA          = privateKeys[secrets.privateAIndex];
    do {
      secrets.privateBIndex   = getRandomInt(privateKeys.length);
    } while (secrets.privateAIndex == secrets.privateBIndex);
    secrets.privateB          = privateKeys[secrets.privateBIndex];

    secrets.publicA           = bigInt(generatePublicKey(bigInt(secrets.prime), bigInt(secrets.generator), bigInt(secrets.privateA)));
    secrets.publicB           = bigInt(generatePublicKey(bigInt(secrets.prime), bigInt(secrets.generator), bigInt(secrets.privateB)));
  }while ((secrets.publicA.isNegative() && secrets.publicB.isNegative()))

  return secrets;
}

export const encryptDataObj = (obj, secrets) => {
  var tmp                     = {}
  var sharedKey               = generateSharedKey(bigInt(secrets.privateA), bigInt(secrets.publicB), bigInt(secrets.prime));
  tmp.e                       = encryptData(obj.eventName, sharedKey, bigInt(secrets.prime), secrets.pLength);
  tmp.d                       = encryptData(obj.date, sharedKey, bigInt(secrets.prime), secrets.pLength);
  if (obj.website != "") {
    tmp.w                     = encryptData(obj.website, sharedKey, bigInt(secrets.prime), secrets.pLength);
  }
  return tmp;
}

const encodeText = tmp => { //ASCII -> Hex -> Decimal
  tmp                         = encodeURIComponent(tmp)
  var str                     = '';
  for (var i = 0; i < tmp.length; i++) {
    var hex                   = tmp[i].charCodeAt(0).toString(16);
    str                      += ("0" + parseInt(hex[0], 16)).slice(-2);
    str                      += ("0" + parseInt(hex[1], 16)).slice(-2);
  }
  return str;
}

const encryptData = (data, sharedKey, prime, pLength) => {
  var encryptedParts          = [];
  var encodedData             = encodeText(data);
  var currentLength           = 0;
  var mLength                 = pLength - 1;
  var lastPartLength          = encodedData.length % mLength;
  do {
    var tmp                   = ((bigInt(encodedData.substr(currentLength, mLength)).multiply(sharedKey)).divmod(prime)).remainder
    encryptedParts.push(Base64.fromNumber(tmp))
    currentLength            += mLength;
  } while (currentLength < encodedData.length)
  return (encryptedParts.toString() + ";" + ((lastPartLength == 0) ? mLength : lastPartLength));
}

export const decryptDataObj = (obj, secrets) => {
  var sharedKey               = generateSharedKey(bigInt(secrets.privateB), bigInt(secrets.publicA), bigInt(secrets.prime))
  var tmp                     = {}
  tmp.eventName               = decryptData(obj.e, sharedKey, bigInt(secrets.prime), secrets.pLength);
  tmp.date                    = decryptData(obj.d, sharedKey, bigInt(secrets.prime), secrets.pLength);
  if (obj.w) {
    tmp.website               = decryptData(obj.w, sharedKey, bigInt(secrets.prime), secrets.pLength);
  }
  return tmp;
}

const decodeText = tmp => { //decimal -> Hex -> ASCII
  var str                     = '';
  for (var n = 0; n < tmp.length; n += 4) {
    var hex                   = parseInt(tmp.substr(n, 2)).toString(16) + parseInt(tmp.substr((n + 2), 2)).toString(16)
    str                      += String.fromCharCode(parseInt(hex, 16));
  }
  return decodeURIComponent(str);
}

const decryptData = (cipherText, sharedKey, prime, pLength) => {
  var encryptedParts          = cipherText.split(",")
  var decryptedString         = "";
  var mLength                 = pLength - 1;
  var lastIndex               = encryptedParts.length - 1
  var lastPartLength          = encryptedParts[lastIndex].substr(encryptedParts[lastIndex].indexOf(";") + 1);
  encryptedParts[lastIndex]   = encryptedParts[lastIndex].substr(0, encryptedParts[lastIndex].indexOf(";"))

  for (var i = 0; i < encryptedParts.length; i++) {
    var tmp                   = (bigInt(Base64.toNumber(encryptedParts[i])).multiply(bigInt(sharedKey).modInv(prime))).divmod(prime).remainder.value.toString();
    while (tmp.length < (i == lastIndex ? lastPartLength : mLength)) {
      tmp                     = "0" + tmp;
    }
    decryptedString          += tmp;
  }
  return decodeText(decryptedString);
}

const Base64 = {
  _Rixits:
    //   0       8       16      24      32      40      48      56     63
    //   v       v       v       v       v       v       v       v      v
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",

  fromNumber: function (number) {
    number                    = number.toString();
    var result                = "";
    var currentIdx            = 0;

    do {
      var numComb             = parseInt(number.substr(currentIdx, 2));
      if (numComb < 10 || numComb > 63)
        result               += number[currentIdx++];
      else {
        result               += this._Rixits[numComb];
        currentIdx           += 2;
      }
    } while (number.length > currentIdx);
    return result;
  },
  toNumber: function (rixits) {
    var result                = "";
    for (var i = 0; i < rixits.length; i++)
      result                 += this._Rixits.indexOf(rixits[i]);
    return result;
  }
}

const generatePublicKey = (p, g, privateKey) => g.modPow(privateKey, p).value;

const generateSharedKey = (user1Prik, user2Pubk, p) => user2Pubk.modPow(user1Prik, p).value;