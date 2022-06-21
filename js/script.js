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
    console.log("You said: " + transcript);
    const canvas = document.querySelector('#canvas');
    canvas.style.backgroundColor = transcript;
    // check if the voice input has ended
    if(event.results[0].isFinal) {
        return event.results[0];
    }
};
recognition.onnomatch = (event) => {
    console.log("No match, you said: "+ event);
};
recognition.onerror = (error) => {
    console.log("An error has occured. Check if microphone use is allowed" + 
    "on this website. Otherwise try a different microphone or Chrome / Firefox. ")
    console.log(error);
}
addSpeechRecognition();

function addSpeechRecognition() {
    const button = document.querySelector('#speech');

    button.addEventListener('click', () => {
        getColor();
    });
}

function getColor() {
    try {
        recognition.start();
    }
    catch {
        console.log("Recognition couldn't start. Wait for recognition to end before starting another one or switch browsers.")
    }
    return;
}