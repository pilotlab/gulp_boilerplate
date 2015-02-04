/// <reference path="easing/back.ts" />
/// <reference path="easing/bounce.ts" />
/// <reference path="easing/circular.ts" />
/// <reference path="easing/cubic.ts" />
/// <reference path="easing/elastic.ts" />
/// <reference path="easing/exponential.ts" />
/// <reference path="easing/linear.ts" />
/// <reference path="easing/quadratic.ts" />
/// <reference path="easing/quartic.ts" />
/// <reference path="easing/quintic.ts" />
/// <reference path="easing/sine.ts" />
var mshell;
(function (mshell) {
    //----- Resource: http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
    (function (AnimEaseCategory) {
        AnimEaseCategory[AnimEaseCategory["LINEAR"] = 0] = "LINEAR";
        AnimEaseCategory[AnimEaseCategory["QUADRATIC"] = 1] = "QUADRATIC";
        AnimEaseCategory[AnimEaseCategory["CUBIC"] = 2] = "CUBIC";
        AnimEaseCategory[AnimEaseCategory["QUARTIC"] = 3] = "QUARTIC";
        AnimEaseCategory[AnimEaseCategory["QUINTIC"] = 4] = "QUINTIC";
        AnimEaseCategory[AnimEaseCategory["SINE"] = 5] = "SINE";
        AnimEaseCategory[AnimEaseCategory["EXPONENTIAL"] = 6] = "EXPONENTIAL";
        AnimEaseCategory[AnimEaseCategory["CIRCULAR"] = 7] = "CIRCULAR";
        AnimEaseCategory[AnimEaseCategory["ELASTIC"] = 8] = "ELASTIC";
        AnimEaseCategory[AnimEaseCategory["BACK"] = 9] = "BACK";
        AnimEaseCategory[AnimEaseCategory["BOUNCE"] = 10] = "BOUNCE";
    })(mshell.AnimEaseCategory || (mshell.AnimEaseCategory = {}));
    var AnimEaseCategory = mshell.AnimEaseCategory;

    (function (AnimEaseType) {
        AnimEaseType[AnimEaseType["NONE"] = 0] = "NONE";
        AnimEaseType[AnimEaseType["IN"] = 1] = "IN";
        AnimEaseType[AnimEaseType["OUT"] = 2] = "OUT";
        AnimEaseType[AnimEaseType["INOUT"] = 3] = "INOUT";
    })(mshell.AnimEaseType || (mshell.AnimEaseType = {}));
    var AnimEaseType = mshell.AnimEaseType;

    //----- t - the elapsed time.
    //----- b - the starting position. In a one dimensional setting this is the value you would get if t = 0.
    //----- c - the 'change' in position. So if you want to transition from 34 to 56 then c = (56-34) = 13. (more on this later)
    //----- d - duration of the transition. If you want the transition to last, for example, 2 seconds then d= 2.
    var AnimEase = (function () {
        function AnimEase() {
        }
        AnimEase.getEasingFunction = function (easeCategory, easeType) {
            switch (easeCategory) {
                case 0 /* LINEAR */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimLinear.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimLinear.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimLinear.easeInOut;
                        case 0 /* NONE */:
                            return mshell.AnimLinear.easeNone;
                    }
                    break;
                case 1 /* QUADRATIC */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimQuadratic.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimQuadratic.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimQuadratic.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 2 /* CUBIC */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimCubic.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimCubic.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimCubic.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 3 /* QUARTIC */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimQuartic.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimQuartic.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimQuartic.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 4 /* QUINTIC */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimQuintic.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimQuintic.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimQuintic.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 5 /* SINE */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimSine.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimSine.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimSine.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 6 /* EXPONENTIAL */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimExponential.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimExponential.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimExponential.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 7 /* CIRCULAR */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimCircular.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimCircular.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimCircular.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 8 /* ELASTIC */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimElastic.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimElastic.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimElastic.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 9 /* BACK */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimBack.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimBack.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimBack.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
                case 10 /* BOUNCE */:
                    switch (easeType) {
                        case 1 /* IN */:
                            return mshell.AnimBounce.easeIn;
                        case 2 /* OUT */:
                            return mshell.AnimBounce.easeOut;
                        case 3 /* INOUT */:
                            return mshell.AnimBounce.easeInOut;
                        case 0 /* NONE */:
                            break;
                    }
                    break;
            }

            return mshell.AnimLinear.easeNone;
        };
        return AnimEase;
    })();
    mshell.AnimEase = AnimEase;
})(mshell || (mshell = {}));
