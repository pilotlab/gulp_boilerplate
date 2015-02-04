var mshell;
(function (mshell) {
    var AnimCircular = (function () {
        function AnimCircular() {
        }
        AnimCircular.easeIn = function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };

        AnimCircular.easeOut = function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        };

        AnimCircular.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return -c * 0.5 * (Math.sqrt(1 - t * t) - 1) + b;
            return c * 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        };
        return AnimCircular;
    })();
    mshell.AnimCircular = AnimCircular;
})(mshell || (mshell = {}));
