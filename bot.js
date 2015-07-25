var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function () {
    var led = new five.Led(11);

    var speed = 0.1;

    var wheels = {
        left: new five.Servo({ pin: 9, type: 'continuous' }),
        right: new five.Servo({ pin: 10, type: 'continuous' }),
        stop: function () {
            wheels.left.center();
            wheels.right.center();
            led.off();
        },
        forward: function () {
            wheels.left.cw(speed);
            wheels.right.cw(speed);
            console.log("goForward", speed);
            led.stop();
            led.on();
            if (speed <= 1) {
                speed = speed + 0.1;
            }
        },
        pivotLeft: function () {
            wheels.left.ccw();
            wheels.right.cw();
            led.stop();
            console.log("turnLeft");
        },
        pivotRight: function () {
            wheels.left.cw();
            wheels.right.ccw();
            led.stop();
            console.log("turnRight");
        },
        back: function () {
            wheels.left.ccw();
            wheels.right.ccw();
            led.stop();
            led.strobe(500);
        }
    };

    wheels.stop();
    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");

    stdin.on("keypress", function(chunk, key) {
        if (!key) return;

        switch (key.name) {
            case 'up':
            case 'w':
                wheels.forward();
                break;

            case 'down':
            case 's':
                wheels.back();
                break;

            case 'left':
            case 'a':
                wheels.pivotLeft();
                break;

            case 'right':
            case 'd':
                wheels.pivotRight();
                break;

            case 'space':
            case 'escape':
                wheels.stop();
                break;
        }
    });
});