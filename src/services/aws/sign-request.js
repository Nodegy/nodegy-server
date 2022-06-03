const crypto = require("crypto-js");

function getSignatureKey(key, dateStamp, regionName, serviceName) {
    var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
    var kRegion = crypto.HmacSHA256(regionName, kDate);
    var kService = crypto.HmacSHA256(serviceName, kRegion);
    var kSigning = crypto.HmacSHA256("aws4_request", kService);
    return kSigning;
}

// const key = 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY'
// const dateStamp = '20120215'
// const regionName = 'us-east-1'
// const serviceName = 'iam'
// console.log('getSig: ', getSignatureKey(key, dateStamp, regionName, serviceName))