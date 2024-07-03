import { KEY_CODES } from './additional/key-codes'

(function() {
    document.addEventListener('keydown', (e) => setKey(e, true)) 
    document.addEventListener('keyup', (e) => setKey(e, false)) 
    window.addEventListener('blur', () => clearPressedKeys()) 
    function setKey({ keyCode }, status) {
        let key = KEY_CODES[keyCode] || String.fromCharCode(keyCode)
        setPressedKey(key, status) 
    }
    function setPressedKey(key, status) {
        pressedKeys.set(key.toUpperCase(), status) 
    }
    function clearPressedKeys() {
        pressedKeys.clear() 
    }
    let pressedKeys = new Map() 
    window.input = {
        isDown: (key) => pressedKeys.has(key.toUpperCase()) && pressedKeys.get(key.toUpperCase()),
    }
})()
