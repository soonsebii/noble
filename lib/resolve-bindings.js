var os = require('os');

module.exports = function(deviceId) {
  var platform = os.platform();

  // HCI overlay
  if (typeof deviceId !== 'undefined') {
    process.env.NOBLE_HCI_DEVICE_ID = deviceId;
  }

  if (process.env.NOBLE_WEBSOCKET) {
    return require('./websocket/bindings');
  } else if (process.env.NOBLE_DISTRIBUTED) {
    return require('./distributed/bindings');
  } else if (platform === 'darwin') {
    return require('./mac/bindings');
  } else if (platform === 'linux' || platform === 'freebsd' || platform === 'win32') {
    // create binding instance
    var NobleBindings = require('./hci-socket/bindings');
    return new NobleBindings();
  } else {
    throw new Error('Unsupported platform');
  }
};
