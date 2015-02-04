/// <reference path="animBase.ts" />
var mshell;
(function (mshell) {
    var AnimWrapper = (function () {
        function AnimWrapper(anim) {
            this._anim = null;
            this._anim = anim;
            this._first = this;
        }
        Object.defineProperty(AnimWrapper.prototype, "anim", {
            get: function () {
                return this._anim;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(AnimWrapper.prototype, "first", {
            //----- The first AnimWrapper in the chain.
            get: function () {
                return this._first;
            },
            enumerable: true,
            configurable: true
        });

        AnimWrapper.prototype.then = function (animWrap) {
            this._anim.then(animWrap._anim);
            animWrap._first = this._first;
            return animWrap;
        };

        AnimWrapper.prototype.and = function (animWrap) {
            this._anim.and(animWrap._anim);
            animWrap._first = this._first;
            return animWrap;
        };
        return AnimWrapper;
    })();
    mshell.AnimWrapper = AnimWrapper;
})(mshell || (mshell = {}));
