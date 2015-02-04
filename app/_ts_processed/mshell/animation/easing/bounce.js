var mshell;
(function (mshell) {
    var AnimBounce = (function () {
        function AnimBounce() {
        }
        AnimBounce.easeOut = function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75))
                return c * (7.5625 * t * t) + b;
            else if (t < (2 / 2.75))
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            else if (t < (2.5 / 2.75))
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            else
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        };

        AnimBounce.easeIn = function (t, b, c, d) {
            return c - AnimBounce.easeOut(d - t, 0.0, c, d) + b;
        };

        AnimBounce.easeInOut = function (t, b, c, d) {
            if (t < d * 0.5)
                return AnimBounce.easeIn(t * 2, 0.0, c, d) * 0.5 + b;
            else
                return AnimBounce.easeOut(t * 2 - d, 0.0, c, d) * 0.5 + c * 0.5 + b;
        };
        return AnimBounce;
    })();
    mshell.AnimBounce = AnimBounce;
})(mshell || (mshell = {}));
