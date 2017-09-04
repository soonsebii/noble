var Noble = require('./lib/noble');
var bindings = require('./lib/resolve-bindings');

module.exports = function(deviceId) {
  return new Noble(bindings(deviceId));
};
