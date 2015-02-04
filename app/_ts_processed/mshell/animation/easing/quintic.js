var mshell;
(function (mshell) {
    var AnimQuintic = (function () {
        function AnimQuintic() {
        }
        AnimQuintic.easeIn = function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };

        AnimQuintic.easeOut = function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };

        AnimQuintic.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * t * t * t * t * t + b;
            return c * 0.5 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        return AnimQuintic;
    })();
    mshell.AnimQuintic = AnimQuintic;
})(mshell || (mshell = {}));
