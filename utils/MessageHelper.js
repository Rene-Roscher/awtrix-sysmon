const Colors = require('./Colors.js');

class MessageHelper {
    static formatText(text, color = Colors.gray["300"]) {
        return { t: text, c: color };
    }

    static createPayload(textArray, options = {}) {
        const { spacer = false, spacerSize = 2, ...otherOptions } = options;

        let processedTextArray = textArray;

        if (spacer) {
            processedTextArray = [];
            textArray.forEach((text, index) => {
                processedTextArray.push(text);
                // Add spacer between elements, except after the last one
                if (index < textArray.length - 1) {
                    processedTextArray.push(this.spacer(spacerSize));
                }
            });
        }

        return {
            text: processedTextArray,
            background: otherOptions.background || "#000000",
            scrollSpeed: otherOptions.scrollSpeed || 50,
            duration: otherOptions.duration || 20,
            ...otherOptions
        };
    }

    static spacer(size = 2) {
        return { t: " ".repeat(size) };
    }
}

module.exports = MessageHelper;
