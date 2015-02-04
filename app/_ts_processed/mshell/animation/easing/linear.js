var mshell;
(function (mshell) {
    var AnimLinear = (function () {
        function AnimLinear() {
        }
        AnimLinear.easeNone = function (t, b, c, d) {
            t /= d;
            return b + c * (t);
        };

        AnimLinear.easeIn = function (t, b, c, d) {
            return c * t / d + b;
        };

        AnimLinear.easeOut = function (t, b, c, d) {
            return c * t / d + b;
        };

        AnimLinear.easeInOut = function (t, b, c, d) {
            return c * t / d + b;
        };
        return AnimLinear;
    })();
    mshell.AnimLinear = AnimLinear;
})(mshell || (mshell = {}));
