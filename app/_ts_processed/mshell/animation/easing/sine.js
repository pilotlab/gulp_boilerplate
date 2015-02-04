var mshell;
(function (mshell) {
    var AnimSine = (function () {
        function AnimSine() {
        }
        AnimSine.easeIn = function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI * 0.5)) + c + b;
        };

        AnimSine.easeOut = function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI * 0.5)) + b;
        };

        AnimSine.easeInOut = function (t, b, c, d) {
            return -c * 0.5 * (Math.cos(Math.PI * t / d) - 1) + b;
        };
        return AnimSine;
    })();
    mshell.AnimSine = AnimSine;
})(mshell || (mshell = {}));
