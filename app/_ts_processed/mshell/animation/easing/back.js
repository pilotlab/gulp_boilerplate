var mshell;
(function (mshell) {
    var AnimBack = (function () {
        function AnimBack() {
        }
        AnimBack.easeIn = function (t, b, c, d) {
            return AnimBack.easeInExtended(t, b, c, d, 1.70158);
        };

        AnimBack.easeInExtended = function (t, b, c, d, s) {
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        };

        AnimBack.easeOut = function (t, b, c, d) {
            return AnimBack.easeOutExtended(t, b, c, d, 1.70158);
        };

        AnimBack.easeOutExtended = function (t, b, c, d, s) {
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        };

        AnimBack.easeInOut = function (t, b, c, d) {
            return AnimBack.easeInOutExtended(t, b, c, d, 1.70158);
        };

        AnimBack.easeInOutExtended = function (t, b, c, d, s) {
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;

            return c * 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        };
        return AnimBack;
    })();
    mshell.AnimBack = AnimBack;
})(mshell || (mshell = {}));
