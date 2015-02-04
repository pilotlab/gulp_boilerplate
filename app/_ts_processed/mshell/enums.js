var mshell;
(function (mshell) {
    (function (ZoomType) {
        ZoomType[ZoomType["NONE"] = 0] = "NONE";
        ZoomType[ZoomType["SCALE"] = 1] = "SCALE";
        ZoomType[ZoomType["STRETCH_HORIZONTALLY"] = 2] = "STRETCH_HORIZONTALLY";
        ZoomType[ZoomType["STRETCH_VERTICALLY"] = 3] = "STRETCH_VERTICALLY";
        ZoomType[ZoomType["STRETCH_BOTH"] = 4] = "STRETCH_BOTH";
        ZoomType[ZoomType["PAN_HORIZONTALLY"] = 5] = "PAN_HORIZONTALLY";
        ZoomType[ZoomType["PAN_VERTICALLY"] = 6] = "PAN_VERTICALLY";
    })(mshell.ZoomType || (mshell.ZoomType = {}));
    var ZoomType = mshell.ZoomType;
})(mshell || (mshell = {}));
