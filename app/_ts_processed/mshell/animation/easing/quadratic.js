var mshell;
(function (mshell) {
    var AnimQuadratic = (function () {
        function AnimQuadratic() {
        }
        AnimQuadratic.easeIn = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };

        AnimQuadratic.easeOut = function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };

        AnimQuadratic.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * t * t + b;
            return -c * 0.5 * ((--t) * (t - 2) - 1) + b;
        };
        return AnimQuadratic;
    })();
    mshell.AnimQuadratic = AnimQuadratic;
})(mshell || (mshell = {}));
