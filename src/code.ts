import {handleEvent, dispatch} from './code-handler-message';

figma.showUI(__html__, { width: 330, height: 300 });
handleEvent('figmaNotify', notify);
dispatch("vueTesting", "this is the love");

function notify(message) {
    figma.notify(message, {timeout: 5000});
}