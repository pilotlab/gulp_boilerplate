var mshell;
(function (mshell) {
    var AnimCubic = (function () {
        function AnimCubic() {
        }
        AnimCubic.easeIn = function (t, b, c, d) {
            var tc = (t /= d) * t * t;
            return b + c * (tc);
        };

        AnimCubic.easeOut = function (t, b, c, d) {
            var ts = (t /= d) * t;
            var tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        };

        AnimCubic.easeInOut = function (t, b, c, d) {
            var ts = (t /= d) * t;
            var tc = ts * t;
            return b + c * (4 * tc + -6 * ts + 3 * t);
        };
        return AnimCubic;
    })();
    mshell.AnimCubic = AnimCubic;
})(mshell || (mshell = {}));
