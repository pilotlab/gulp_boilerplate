/// <reference path="iHiResTimerCounter.ts" />
var mshell;
(function (mshell) {
    var HiResTimerCounterBrowser = (function () {
        function HiResTimerCounterBrowser() {
            this._frequency = 1000;
        }
        Object.defineProperty(HiResTimerCounterBrowser.prototype, "frequency", {
            /*
            * Stores the frequency of the high-resolution performance counter.
            * This value cannot change while the system is running.
            */
            get: function () {
                return this._frequency;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HiResTimerCounterBrowser.prototype, "count", {
            get: function () {
                return window.performance.now();
            },
            enumerable: true,
            configurable: true
        });

        HiResTimerCounterBrowser.prototype.newCounter = function () {
            return new HiResTimerCounterBrowser();
        };
        return HiResTimerCounterBrowser;
    })();
    mshell.HiResTimerCounterBrowser = HiResTimerCounterBrowser;
})(mshell || (mshell = {}));
