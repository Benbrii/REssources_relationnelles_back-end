export const encodeString = string => {
    if (string !== undefined) {
        string = string.replace(/\n/gi, "</br>");
    }

    return string;
};
