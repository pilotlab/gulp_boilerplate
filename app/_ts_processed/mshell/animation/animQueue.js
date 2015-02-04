/// <reference path="animBase.ts" />
/// <reference path="../collections/list.ts" />
var mshell;
(function (mshell) {
    var AnimQueue = (function () {
        function AnimQueue(parentAnim) {
            this._parentAnim = null;
            this.anims = null;
            this.p_deadAnims = null;
            this._bDead = false;
            this._parentAnim = parentAnim;
            this.anims = new mshell.List();
        }
        Object.defineProperty(AnimQueue.prototype, "isDead", {
            get: function () {
                return this._bDead;
            },
            enumerable: true,
            configurable: true
        });

        AnimQueue.prototype.length = function () {
            if (this.anims != null)
                return this.anims.length;
            else
                return 0;
        };

        AnimQueue.prototype.add = function (anim) {
            if (this.anims != null)
                this.anims.add(anim);
        };

        AnimQueue.prototype.clear = function () {
            this.anims.clear();
        };

        AnimQueue.prototype.tick = function () {
            var anim = null;
            var bDeadBranch = true;
            for (var i = 0; i < this.anims.length; i++) {
                anim = this.anims[i];
                if (anim._bDeadBranch == false) {
                    bDeadBranch = false;
                    anim._tick();
                } else if (this.p_deadAnims != null)
                    this.p_deadAnims.add(anim);
            }

            if (bDeadBranch && !this._bDead) {
                this._bDead = true;
            }
        };
        return AnimQueue;
    })();
    mshell.AnimQueue = AnimQueue;
})(mshell || (mshell = {}));
