// allows local dev on mac
let Gpio;
try {
	Gpio = require('onoff').Gpio;
} catch (e) {
	// console.log(e);
}

let controlPin;
let ledPin;
if (Gpio) {
	controlPin = new Gpio(14, 'out');
	ledPin = new Gpio(15, 'out');
}

process.on('SIGINT', function () {
  controlPin.unexport();
  ledPin.unexport();
});
  
module.exports = {
	controlPin,
	ledPin
};