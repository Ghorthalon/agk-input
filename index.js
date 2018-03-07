'use strict';

/** Simple class to help with Keyboard Input.
	* This class adds helper functions to pole the state of a key without firing for events. This way, you can check for key presses directly inside your game loop.
		* It adds functions for isJustPressed() and isJustReleased(), which only return true once and false un subsequent calls until the key has either been pressed or released again.
 */
class KeyboardInput {
	constructor() {
		this.keyDown = [];
		this.justPressed = [];
		this.justReleased = [];
		this.justPressedEventCallback = null;
	}

	/** Destroys the KeyboardInput and releases the event hooks. This should be called when you're done using the library in it's context. */
	destroy() {
    document.removeEventListener('keydown', event => {
 this.handleKeyDown(event);
    });
    document.removeEventListener('keyup', event => {
 this.handleKeyUp(event);
    });
	}

	/** This needs to be called to initialize the keyboard input after instanciating the class. */
	init() {
		const that = this;
    // 		$(document).keydown(function(event) { that.handleKeyDown(event); });
    // 		$(document).keyup(function(event) { that.handleKeyUp(event); });
    document.addEventListener('keydown', event => {
 that.handleKeyDown(event);
    });
    document.addEventListener('keyup', event => {
 that.handleKeyUp(event);
    });
	}

	/** @internal Callback function to handle the keydown event.
	* @param {object} event - the event fired from the keydown event.
	*/
	handleKeyDown(event) {
		if (this.keyDown[event.which] !== true || typeof this.keyDown[event.which] === 'undefined') {
			this.keyDown[event.which] = true;
			this.justPressed[event.which] = true;
			this.justReleased[event.which] = false;
			if (typeof this.justPressedEventCallback !== 'undefined' && this.justPressedEventCallback !== null) {
this.justPressedEventCallback(event.which);
			}
		}
	}

	/** @internal Callback function to handle keyup events.
	* @param {object} event - the event fired from the keyup listener.
*/
	handleKeyUp(event) {
		if (this.keyDown[event.which] === true) {
			this.keyDown[event.which] = false;
			this.justPressed[event.which] = false;
			this.justReleased[event.which] = true;
		}
	}

	/** Checks if a key is currently being held.
	* @param {number} keycode - The keycode of the key to be checked.
	* @return {boolean} True on key being held, false otherwise.
*/
	isDown(event) {
		return this.keyDown[event];
	}
	/** Returns true if the key has been pressed since it's last call and is still down. Returns false if this function has already been called but the key is still down, or the key has been released.
	* @param {number} keycode - the code of the key to be checked.
	* @return {boolean} True if the key has been pressed since last call and is still down. False otherwise.
*/

	isJustPressed(event) {
		if (this.justPressed[event] === true) {
			this.justPressed[event] = false;
			return true;
		}
		return false;
	}

	/** Function to check if a key has been released since last call.
	* @param {number} keycode - the code of the key to be checked.
	* @return {boolean} True if the key has just been released, false otherwise.
*/

	isJustReleased(event) {
		if (this.justReleased[event]) {
			this.justReleased[event] = false;
			return true;
		}
		return false;
	}
}

export default KeyboardInput;
