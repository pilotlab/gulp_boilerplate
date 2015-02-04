var mshell;
(function (mshell) {
    var AnimExponential = (function () {
        function AnimExponential() {
        }
        AnimExponential.easeIn = function (t, b, c, d) {
            return t == 0.0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        };

        AnimExponential.easeOut = function (t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };

        AnimExponential.easeInOut = function (t, b, c, d) {
            if (t == 0.0)
                return b;

            if (t == d)
                return b + c;

            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * Math.pow(2, 10 * (t - 1)) + b;

            return c * 0.5 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
        return AnimExponential;
    })();
    mshell.AnimExponential = AnimExponential;
})(mshell || (mshell = {}));
