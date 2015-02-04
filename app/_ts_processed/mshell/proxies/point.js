var mshell;
(function (mshell) {
    var Point = (function () {
        function Point(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    mshell.Point = Point;
})(mshell || (mshell = {}));
