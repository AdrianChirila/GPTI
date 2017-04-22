/**
 * Created by danv on 2/1/17.
 */
var logger = null;
var ConsoleLogger = (function () {
    function ConsoleLogger(location) {
        this.location = "[LOCAL]";
        this.location = location;
    }
    ConsoleLogger.prototype.log = function (message) {
        console.log(this.location + ": " + message);
    };
    return ConsoleLogger;
}());
export { ConsoleLogger };
export function getLogger(tag) {
    if (!logger)
        logger = new ConsoleLogger(tag);
    return logger;
}
//# sourceMappingURL=console-logger.js.map