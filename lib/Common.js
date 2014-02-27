/**
 * Author: jo32
 * 
 * License: MIT
 * 
 **/

function getDebugMsg(tag, level, msg) {
    return "[" + tag + "][" + level + "]" + msg;
}


function checkRequiredParameters(requiredParameters, parameters) {
    for (var i in requiredParameters) {
        if (requiredParameters[i] in parameters) {
            continue;
        }
        throw getDebugMsg("Error", "Lacking parameter: " + requiredParameters[i]);
    }
}

if (exports !== "undefined") {
    exports["getDebugMsg"] = getDebugMsg;
    exports["checkRequiredParameters"] = checkRequiredParameters;
}