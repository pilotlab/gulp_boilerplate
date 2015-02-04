/// <reference path="animQueue.ts" />
/// <reference path="animWrapper.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mshell;
(function (mshell) {
    var AnimManager = (function (_super) {
        __extends(AnimManager, _super);
        function AnimManager(timerCounter) {
            if (typeof timerCounter === "undefined") { timerCounter = null; }
            _super.call(this, null);
            this.p_timerCounter = null;
            this.ticked = new mshell.Signal();

            this.p_timerCounter = this.timerCounter;
            this.p_deadAnims = new mshell.List();
        }
        Object.defineProperty(AnimManager.prototype, "timerCounter", {
            get: function () {
                return this.p_timerCounter;
            },
            set: function (value) {
                this.p_timerCounter = value;

                this.anims.forEach(function (anim) {
                    anim.setTimerCounter(value);
                    return true;
                });
            },
            enumerable: true,
            configurable: true
        });

        AnimManager.prototype.tick = function () {
            if (this.p_timerCounter == null)
                return;

            _super.prototype.tick.call(this);

            for (var i = 0; i < this.p_deadAnims.length; i++) {
                this.anims.remove(this.p_deadAnims[i]);
            }

            this.p_deadAnims.clear();

            this.ticked.dispatch(new mshell.EventArgs());
        };

        AnimManager.prototype.add = function (anim) {
            anim.setTimerCounter(this.p_timerCounter);
            _super.prototype.add.call(this, anim);
        };

        AnimManager.prototype.run = function (animWrap) {
            this.add(animWrap.anim);
            return animWrap;
        };
        return AnimManager;
    })(mshell.AnimQueue);
    mshell.AnimManager = AnimManager;
})(mshell || (mshell = {}));
