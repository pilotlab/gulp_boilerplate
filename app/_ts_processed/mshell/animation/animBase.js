/// <reference path="animQueue.ts" />
/// <reference path="animEase.ts" />
/// <reference path="hiResTimer/hiResTimer.ts" />
/// <reference path="hiResTimer/iHiResTimerCounter.ts" />
/// <reference path="../events.ts" />
var mshell;
(function (mshell) {
    /*--------------------------------------------------------------------*
    USAGE
    *--------------------------------------------------------------------*
    _mshellRoot.animate.run(btn1.moveBy(100, 100, 1, AnimEase.getEasingFunction(AnimEaseCategory.SINE, AnimEaseType.INOUT))).and(
    btn1.rotateBy(-100, 1).then(btn1.rotateBy(100, 1)).first
    ).and(
    btn1.fadeTo(100, 1)
    ).then(
    btn1.moveBy(-100, -100, 1).and(btn1.fadeTo(50, 1)).then(btn1.pause(2, this.animPause_onDone)).first
    );
    *--------------------------------------------------------------------*/
    var AnimBase = (function () {
        function AnimBase(duration, ease) {
            if (typeof duration === "undefined") { duration = 0.0; }
            if (typeof ease === "undefined") { ease = null; }
            this.p_duration = 0.0;
            this.p_bTimed = true;
            this.p_bInitialized = false;
            this.p_bDone = false;
            this._bDeadBranch = false;
            //----- done
            this.done = new mshell.Signal();
            //----- ticked
            this.ticked = new mshell.Signal();
            this.p_duration = duration;
            if (ease != null)
                this.p_ease = ease;
            else
                this.p_ease = mshell.AnimEase.getEasingFunction(5 /* SINE */, 3 /* INOUT */);

            this.p_thenAnimQueue = new mshell.AnimQueue(this);
            this.p_andAnimQueue = new mshell.AnimQueue(this);

            this.done.listen(this.p_onDone);
            this.ticked.listen(this.p_onTicked);
        }
        Object.defineProperty(AnimBase.prototype, "isTimed", {
            get: function () {
                return this.p_bTimed;
            },
            set: function (value) {
                this.p_bTimed = value;
            },
            enumerable: true,
            configurable: true
        });

        AnimBase.prototype._tick = function () {
            if (!this._bDeadBranch) {
                var bAndQueueDead = false;
                var bThenQueueDead = false;

                if (this.p_andAnimQueue != null && this.p_andAnimQueue.length() > 0 && !this.p_andAnimQueue.isDead) {
                    this.p_andAnimQueue.tick();
                } else
                    bAndQueueDead = true;

                if (this.p_bDone) {
                    if (this.p_thenAnimQueue != null && this.p_thenAnimQueue.length() > 0 && !this.p_thenAnimQueue.isDead) {
                        this.p_thenAnimQueue.tick();
                    } else
                        bThenQueueDead = true;

                    //----- This anim is a dead branch if it's done animating and both
                    //----- its andQueue and thenQueue are empty, or dead.
                    if (bAndQueueDead && bThenQueueDead)
                        this._bDeadBranch = true;

                    return;
                }
            } else
                return;

            if (!this.p_bInitialized) {
                if (!this.p_bTimed) {
                    this.p_onInitialized();
                    this.p_bInitialized = true;
                } else if (this.p_timer != null) {
                    this.p_onInitialized();
                    if (!this.p_timer.isRunning)
                        this.p_timer.start();
                    this.p_bInitialized = true;
                }
            }

            if (this.p_bTimed && this.p_timer != null) {
                var p = this.p_timer.elapsed() / this.p_duration;

                if (p >= 1.0) {
                    p = 1.0;
                    this.p_bDone = true;
                    this.p_timer.stop();
                    this.ticked.dispatch(new mshell.AnimEventArgs(p));
                    this.done.dispatch(new mshell.EventArgs());
                    return;
                }

                this.ticked.dispatch(new mshell.AnimEventArgs(p));
            }
        };

        AnimBase.prototype.p_onInitialized = function () {
        };
        AnimBase.prototype.p_onTicked = function (args) {
        };

        //----- Fire event from an external class.
        AnimBase.prototype.doDone = function () {
            this.p_bDone = true;
            this.p_timer.stop();
            this.done.dispatch(new mshell.EventArgs());
        };
        AnimBase.prototype.p_onDone = function (args) {
        };

        AnimBase.prototype.then = function (anim) {
            anim.setTimerCounter(this._timerCounter);
            this.p_thenAnimQueue.add(anim);
        };

        AnimBase.prototype.and = function (anim) {
            anim.setTimerCounter(this._timerCounter);
            this.p_andAnimQueue.add(anim);
        };

        AnimBase.prototype.setTimerCounter = function (timerCounter) {
            if (timerCounter == null)
                return;

            this._timerCounter = timerCounter;

            if (this.p_timer == null)
                this.p_timer = new mshell.HiResTimer(timerCounter.newCounter(), false);

            this.p_andAnimQueue.anims.forEach(function (anim) {
                anim.setTimerCounter(timerCounter);
                return true;
            });

            this.p_thenAnimQueue.anims.forEach(function (anim) {
                anim.setTimerCounter(timerCounter);
                return true;
            });
        };
        return AnimBase;
    })();
    mshell.AnimBase = AnimBase;
})(mshell || (mshell = {}));
