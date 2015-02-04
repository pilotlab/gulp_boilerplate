var mshell;
(function (mshell) {
    var AnimElastic = (function () {
        function AnimElastic() {
        }
        AnimElastic.easeIn = function (t, b, c, d) {
            return AnimElastic.easeInExtended(t, b, c, d, 0.0, 0.0);
        };

        AnimElastic.easeInExtended = function (t, b, c, d, a, p) {
            if (t == 0.0)
                return b;
            if ((t /= d) == 1.0)
                return b + c;
            if (p == 0.0)
                p = d * 0.3;

            var s = 0.0;

            if (a == 0.0 || a < Math.abs(c)) {
                a = c;
                s = p * 0.25;
            } else
                s = p / (2 * Math.PI) * Math.asin(c / a);

            return -(a * Math.pow(2, 10 * (--t)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        };

        AnimElastic.easeOut = function (t, b, c, d) {
            return AnimElastic.easeOutExtended(t, b, c, d, 0.0, 0.0);
        };

        AnimElastic.easeOutExtended = function (t, b, c, d, a, p) {
            if (t == 0.0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (p == 0.0)
                p = d * 0.3;

            var s = 0.0;

            if (a == 0.0 || a < Math.abs(c)) {
                a = c;
                s = p * 0.25;
            } else
                s = p / (2 * Math.PI) * Math.asin(c / a);

            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        };

        AnimElastic.easeInOut = function (t, b, c, d) {
            return AnimElastic.easeInOutExtended(t, b, c, d, 0.0, 0.0);
        };

        AnimElastic.easeInOutExtended = function (t, b, c, d, a, p) {
            if (t == 0.0)
                return b;
            if ((t /= d * 0.5) == 2)
                return b + c;
            if (p == 0.0)
                p = d * (0.3 * 1.5);

            var s = 0.0;
            if (a == 0 || a < Math.abs(c)) {
                a = c;
                s = p * 0.25;
            } else
                s = p / (2 * Math.PI) * Math.asin(c / a);

            if (t < 1.0)
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;

            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        };
        return AnimElastic;
    })();
    mshell.AnimElastic = AnimElastic;
})(mshell || (mshell = {}));
