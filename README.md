# AGK-Input
## Keyboard Input for Audio Games

This library gives you quick access to the keyboard.
One of it's main outstandings is the fact that you can pole the keyboard state without listening for events, letting you query keyboard state in your main loop, etc.

## Installation
On NPM:
npm install agk-input

## Usage

import KeyboardInput from "agk-input";
import KeyCodes from "agk-input/keycodes";

var InputHandler = new KeyboardInput();
InputHandler.init();

function GameLoop() {
	if (InputHandler.isJustPressed(KeyCodes.DOM_VK_SPACE)) {
		console.log("Just pressed space");
		}
	if (InputHandler.isJustReleased(KeyCodes.DOM_VK_SPACE)) {
		console.log("Just released space");
	}
	
	if (InputHandler.isDown(KeyCodes.DOM_VK_SPACE)) {
		console.log("Holding space, logging this is probably a bad idea.");
	}
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);


## Contributing

Any contributions welcome. Help me improve!


## License

This code is MIT licensed.
You don't have to credit, but maybe you want to? :)
See LICENSE.md