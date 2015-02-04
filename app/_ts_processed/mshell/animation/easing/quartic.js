var mshell;
(function (mshell) {
    var AnimQuartic = (function () {
        function AnimQuartic() {
        }
        AnimQuartic.easeIn = function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };

        AnimQuartic.easeOut = function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };

        AnimQuartic.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * t * t * t * t + b;
            return -c * 0.5 * ((t -= 2) * t * t * t - 2) + b;
        };
        return AnimQuartic;
    })();
    mshell.AnimQuartic = AnimQuartic;
})(mshell || (mshell = {}));
