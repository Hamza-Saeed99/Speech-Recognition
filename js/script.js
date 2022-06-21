import {CSS_COLOR_NAMES} from './colors.js'

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var recognition = new SpeechRecognition();
var grammarList = new SpeechGrammarList();
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + CSS_COLOR_NAMES.join(' | ') + ' ;';
grammarList.addFromString(grammar, 1);
recognition.grammars = grammarList;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    const canvas = document.querySelector('#canvas');
    canvas.style.backgroundColor = transcript;
    // check if the voice input has ended
    if(event.results[0].isFinal) {
        console.log(transcript);
        return event.results[0];
    }
};
recognition.onnomatch = (event) => {
    console.log("lok");
    console.log(event);
};
recognition.onerror = (error) => {
    console.log(error);
}
addSpeechRecognition();

function addSpeechRecognition() {
    const button = document.querySelector('#speech');

    button.addEventListener('click', () => {
        let color = getColor();
        if(!color) {
            return;
        }
        const canvas = document.querySelector('#canvas');
        canvas.style.backgroundColor = color;
    });
}

function getColor() {
    recognition.start();    

    return undefined;
}