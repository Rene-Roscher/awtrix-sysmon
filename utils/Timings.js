/**
 * Set an interval that runs immediately
 * @param callback
 * @param interval
 * @returns {number}
 */
export const setImmediateInterval = (callback, interval) => {
    callback();
    return setInterval(callback, interval);
}
