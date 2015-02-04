var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
  $scope.graph = {'width': 100, 'height': 100}
  $scope.circles = [
    {'x': 25, 'y': 20, 'r':15},
    {'x': 50, 'y': 70, 'r':30},
    {'x': 80, 'y': 10, 'r':10},
  ]
});
      
/*class Student {
fullname : string;
constructor(public firstname, public middleinitial, public lastname) {
this.fullname = firstname + " " + middleinitial + " " + lastname;
}
}
interface Person {
firstname: string;
lastname: string;
}
function greeter(person : Person) {
return "Hello, " + person.firstname + " " + person.lastname;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML += " and Pebbles are outrageous " + greeter(user);*/

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

/// <reference path="collections/list.ts" />
/// <reference path="signal.ts" />
/// <reference path="iControl.ts" />
/// <reference path="proxies/point.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mshell;
(function (mshell) {
    var EventArgs = (function () {
        function EventArgs() {
            this.args = new mshell.List();
        }
        EventArgs.empty = new EventArgs();
        return EventArgs;
    })();
    mshell.EventArgs = EventArgs;

    

    var PropertyChangedEventArgs = (function (_super) {
        __extends(PropertyChangedEventArgs, _super);
        function PropertyChangedEventArgs(propertyName, value) {
            _super.call(this);
            this.propertyName = propertyName;
            this.value = value;
        }
        return PropertyChangedEventArgs;
    })(EventArgs);
    mshell.PropertyChangedEventArgs = PropertyChangedEventArgs;

    /*====================================================================*
    START: ControlEventArgs
    *====================================================================*/
    var ControlEventArgs = (function (_super) {
        __extends(ControlEventArgs, _super);
        function ControlEventArgs(control) {
            _super.call(this);
            this.control = control;
        }
        return ControlEventArgs;
    })(EventArgs);
    mshell.ControlEventArgs = ControlEventArgs;

    /*====================================================================*
    START: MouseEventArgs
    *====================================================================*/
    (function (MouseButtonState) {
        MouseButtonState[MouseButtonState["PRESSED"] = 0] = "PRESSED";
        MouseButtonState[MouseButtonState["RELEASED"] = 1] = "RELEASED";
    })(mshell.MouseButtonState || (mshell.MouseButtonState = {}));
    var MouseButtonState = mshell.MouseButtonState;

    var MouseButtons = (function () {
        function MouseButtons() {
            this.left = 1 /* RELEASED */;
            this.right = 1 /* RELEASED */;
            this.middle = 1 /* RELEASED */;
            this.xButton1 = 1 /* RELEASED */;
            this.xButton2 = 1 /* RELEASED */;
        }
        return MouseButtons;
    })();
    mshell.MouseButtons = MouseButtons;

    var MouseEventArgs = (function (_super) {
        __extends(MouseEventArgs, _super);
        function MouseEventArgs(sender, buttons, clickCount, positionRoot, positionLocal, wheelDelta) {
            _super.call(this);
            this.isHandled = false;
            this.sender = sender;
            this.buttons = buttons;
            this.clickCount = clickCount;
            this.positionRoot = positionRoot;
            this.positionLocal = positionLocal;
            this.wheelDelta = wheelDelta;
        }
        return MouseEventArgs;
    })(EventArgs);
    mshell.MouseEventArgs = MouseEventArgs;

    /*====================================================================*
    START: AnimEventArgs
    *====================================================================*/
    var AnimEventArgs = (function (_super) {
        __extends(AnimEventArgs, _super);
        function AnimEventArgs(p) {
            _super.call(this);
            this.p = p;
        }
        return AnimEventArgs;
    })(EventArgs);
    mshell.AnimEventArgs = AnimEventArgs;
})(mshell || (mshell = {}));

/// <reference path="iRoot.ts" />


/// <reference path="signalBinding.ts" />
var mshell;
(function (mshell) {
    /**
    *	@desc       A TypeScript conversion of JS Signals by Miller Medeiros
    *               Released under the MIT license
    *				http://millermedeiros.github.com/js-signals/
    *
    *	@version	1.0 - 7th March 2013
    *
    *	@author 	Richard Davey, TypeScript conversion
    *	@author		Miller Medeiros, JS Signals
    *	@author		Robert Penner, AS Signals
    *
    *	@url		http://www.photonstorm.com
    */
    /**
    * Custom event broadcaster
    * <br />- inspired by Robert Penner's AS3 Signals.
    * @name Signal
    * @author Miller Medeiros
    * @constructor
    */
    var Signal = (function () {
        function Signal() {
            /**
            * @property _bindings
            * @type Array
            * @private
            */
            this._bindings = [];
            /**
            * @property _prevParam
            * @type Any
            * @private
            */
            this._prevParam = null;
            /**
            * If Signal should keep record of previously dispatched parameters and
            * automatically execute listener during `listen()`/`listenOnce()` if Signal was
            * already dispatched before.
            * @type boolean
            */
            this.isMemorize = false;
            /**
            * @type boolean
            * @private
            */
            this._bShouldPropagate = true;
            /**
            * If Signal is active and should broadcast events.
            * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch,
            * if you want to stop the propagation of a signal use `halt()` instead.</p>
            * @type boolean
            */
            this.isActive = true;
        }
        /**
        * @method validateListener
        * @param {any} listener
        * @param {any} fnName
        */
        Signal.prototype.validateListener = function (listener, fnName) {
            if (typeof listener !== 'Function') {
                throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
            }
        };

        /**
        * @param {Function} listener
        * @param {boolean} isOnce
        * @param {Object} [listenerContext]
        * @param {number} [priority]
        * @return {SignalBinding<T>}
        * @private
        */
        Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
            var prevIndex = this._indexOfListener(listener, listenerContext);
            var binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];

                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot listen' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            } else {
                binding = new mshell.SignalBinding(this, listener, isOnce, listenerContext, priority);

                this._addBinding(binding);
            }

            if (this.isMemorize && this._prevParam) {
                binding.execute(this._prevParam);
            }

            return binding;
        };

        /**
        * @method _addBinding
        * @param {SignalBinding<T>} binding
        * @private
        */
        Signal.prototype._addBinding = function (binding) {
            //----- Simplified insertion sort
            var n = this._bindings.length;

            do {
                --n;
            } while(this._bindings[n] && binding.priority <= this._bindings[n].priority);

            this._bindings.splice(n + 1, 0, binding);
        };

        /**
        * @method _indexOfListener
        * @param {Function} listener
        * @param {any} context
        * @return {number}
        * @private
        */
        Signal.prototype._indexOfListener = function (listener, context) {
            var n = this._bindings.length;
            var cur;

            while (n--) {
                cur = this._bindings[n];

                if (cur.getListener() === listener && cur.context === context) {
                    return n;
                }
            }

            return -1;
        };

        /**
        * Check if listener was attached to Signal.
        * @param {Function} listener
        * @param {Object} [context]
        * @return {boolean} if Signal has the specified listener.
        */
        Signal.prototype.has = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            return this._indexOfListener(listener, context) !== -1;
        };

        /**
        * Add a listener to the signal.
        * @param {Function} listener Signal handler function.
        * @param {Object} [listenerContext] Context on which listener will be executed
        * (object that should represent the `this` variable inside listener function).
        * @param {Number} [priority] The priority level of the event listener.
        * Listeners with higher priority will be executed before listeners with lower priority.
        * Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {SignalBinding<T>} An Object representing the binding between the Signal and listener.
        */
        Signal.prototype.listen = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this.validateListener(listener, 'listen');
            return this._registerListener(listener, false, listenerContext, priority);
        };

        /**
        * Add listener to the signal that should be removed after first execution (will be executed only once).
        * @param {Function} listener Signal handler function.
        * @param {Object} [listenerContext] Context on which listener will be executed
        * (object that should represent the `this` variable inside listener function).
        * @param {Number} [priority] The priority level of the event listener.
        * Listeners with higher priority will be executed before listeners with lower priority.
        * Listeners with same priority level will be executed at the same order as they were added. (default = 0)
        * @return {SignalBinding<T>} An Object representing the binding between the Signal and listener.
        */
        Signal.prototype.listenOnce = function (listener, listenerContext, priority) {
            if (typeof listenerContext === "undefined") { listenerContext = null; }
            if (typeof priority === "undefined") { priority = 0; }
            this.validateListener(listener, 'listenOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        };

        /**
        * Remove a single listener from the dispatch queue.
        * @param {Function} listener Handler function that should be removed.
        * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
        * @return {Function} Listener handler function.
        */
        Signal.prototype.remove = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            this.validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);

            if (i !== -1) {
                this._bindings[i].destroy(); // No reason for a SignalBinding to exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }

            return listener;
        };

        /**
        * Remove all listeners from the Signal.
        */
        Signal.prototype.removeAll = function () {
            var n = this._bindings.length;

            while (n--) {
                this._bindings[n].destroy();
            }

            this._bindings.length = 0;
        };

        /**
        * @return {number} Number of listeners attached to the Signal.
        */
        Signal.prototype.getNumListeners = function () {
            return this._bindings.length;
        };

        /**
        * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
        * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
        * @see Signal.prototype.disable
        */
        Signal.prototype.halt = function () {
            this._bShouldPropagate = false;
        };

        /**
        * Dispatch/Broadcast Signal to all listeners added to the queue.
        * @param {...*} [params] Parameters that should be passed to each handler.
        */
        Signal.prototype.dispatch = function (param) {
            if (!this.isActive) {
                return;
            }

            var n = this._bindings.length;
            var bindings;

            if (this.isMemorize) {
                this._prevParam = param;
            }

            if (!n) {
                //----- Should come after isMemorize
                return;
            }

            bindings = this._bindings.slice(0); // Clone array in case add/remove items during dispatch.

            this._bShouldPropagate = true; // In case `halt` was called before dispatch or during the previous dispatch.

            do {
                n--;
            } while(bindings[n] && this._bShouldPropagate && bindings[n].execute(param) !== false);
        };

        /**
        * Forget memorized arguments.
        * @see Signal.isMemorize
        */
        Signal.prototype.forget = function () {
            this._prevParam = null;
        };

        /**
        * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
        * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
        */
        Signal.prototype.dispose = function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParam;
        };

        /**
        * @return {string} String representation of the object.
        */
        Signal.prototype.toString = function () {
            return '[Signal isActive:' + this.isActive + ' numListeners:' + this.getNumListeners() + ']';
        };
        Signal.VERSION = '1.0.0';
        return Signal;
    })();
    mshell.Signal = Signal;
})(mshell || (mshell = {}));

var mshell;
(function (mshell) {
    /// <reference path="signal.ts" />
    /*
    *	@desc   	An object that represents a binding between a Signal and a listener function.
    *               Released under the MIT license
    *				http://millermedeiros.github.com/js-signals/
    *
    *	@version	1.0 - 7th March 2013
    *
    *	@author 	Richard Davey, TypeScript conversion
    *	@author		Miller Medeiros, JS Signals
    *	@author		Robert Penner, AS Signals
    *
    *	@url		http://www.kiwijs.org
    *
    */
    var SignalBinding = (function () {
        /**
        * Object that represents a binding between a Signal and a listener function.
        * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
        * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
        * @author Miller Medeiros
        * @constructor
        * @internal
        * @name SignalBinding
        * @param {Signal} signal Reference to Signal object that listener is currently bound to.
        * @param {Function} listener Handler function bound to the signal.
        * @param {boolean} isOnce If binding should be executed just once.
        * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
        * @param {Number} [priority] The priority level of the event listener. (default = 0).
        */
        function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            /**
            * If binding is active and should be executed.
            * @type boolean
            */
            this.isActive = true;
            this._listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this.priority = priority;
        }
        /**
        * Call listener passing arbitrary parameters.
        * <p>If binding was added using `Signal.listenOnce()` it will be automatically removed from signal dispatch queue,
        * this method is used internally for the signal dispatch.</p>
        * @param {T} [param] Parameter that should be passed to the listener
        * @return {*} Value returned by the listener.
        */
        SignalBinding.prototype.execute = function (param) {
            var handlerReturn;

            if (this.isActive && !!this._listener) {
                handlerReturn = this._listener.apply(this.context, param);

                if (this._isOnce) {
                    this.detach();
                }
            }

            return handlerReturn;
        };

        /**
        * Detach binding from signal.
        * - alias to: mySignal.remove(myBinding.getListener());
        * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
        */
        SignalBinding.prototype.detach = function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
        };

        /**
        * @return {boolean} Is the binding still bound to the signal with a listener?
        */
        SignalBinding.prototype.isBound = function () {
            return (!!this._signal && !!this._listener);
        };

        /**
        * @return {boolean} Will SignalBinding be executed only once?
        */
        SignalBinding.prototype.isOnce = function () {
            return this._isOnce;
        };

        /**
        * @return {Function} Handler function bound to the signal.
        */
        SignalBinding.prototype.getListener = function () {
            return this._listener;
        };

        /**
        * @return {Signal} Signal that listener is currently bound to.
        */
        SignalBinding.prototype.getSignal = function () {
            return this._signal;
        };

        /**
        * Delete instance properties
        * @private
        */
        SignalBinding.prototype.destroy = function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        };

        /**
        * @return {string} String representation of the object.
        */
        SignalBinding.prototype.toString = function () {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', isActive:' + this.isActive + ']';
        };
        return SignalBinding;
    })();
    mshell.SignalBinding = SignalBinding;
})(mshell || (mshell = {}));

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

/// <reference path="collections.ts" />
var mshell;
(function (mshell) {
    var arrays = (function () {
        function arrays() {
        }
        /**
        * Returns the position of the first occurrence of the specified item
        * within the specified array.
        * @param {*} array the array in which to search the element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between 2 elements.
        * @return {number} the position of the first occurrence of the specified element
        * within the specified array, or -1 if not found.
        */
        arrays.indexOf = function (array, item, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        };

        /**
        * Returns the position of the last occurrence of the specified element
        * within the specified array.
        * @param {*} array the array in which to search the element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between 2 elements.
        * @return {number} the position of the last occurrence of the specified element
        * within the specified array or -1 if not found.
        */
        arrays.lastIndexOf = function (array, item, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        };

        /**
        * Returns true if the specified array contains the specified element.
        * @param {*} array the array in which to search the element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function to
        * check equality between 2 elements.
        * @return {boolean} true if the specified array contains the specified element.
        */
        arrays.contains = function (array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        };

        /**
        * Removes the first ocurrence of the specified element from the specified array.
        * @param {*} array the array in which to search element.
        * @param {Object} item the element to search.
        * @param {function(Object,Object):boolean=} equalsFunction optional function to
        * check equality between 2 elements.
        * @return {boolean} true if the array changed after this call.
        */
        arrays.remove = function (array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        };

        /**
        * Returns the number of elements in the specified array equal
        * to the specified object.
        * @param {Array} array the array in which to determine the frequency of the element.
        * @param {Object} item the element whose frequency is to be determined.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between 2 elements.
        * @return {number} the number of elements in the specified array
        * equal to the specified object.
        */
        arrays.frequency = function (array, item, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        };

        /**
        * Returns true if the two specified arrays are equal to one another.
        * Two arrays are considered equal if both arrays contain the same number
        * of elements, and all corresponding pairs of elements in the two
        * arrays are equal and are in the same order.
        * @param {Array} array1 one array to be tested for equality.
        * @param {Array} array2 the other array to be tested for equality.
        * @param {function(Object,Object):boolean=} equalsFunction optional function used to
        * check equality between elemements in the arrays.
        * @return {boolean} true if the two arrays are equal
        */
        arrays.equals = function (array1, array2, equalsFunction) {
            var equals = equalsFunction || mshell.collections.defaultEquals;

            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        };

        /**
        * Returns shallow a copy of the specified array.
        * @param {*} array the array to copy.
        * @return {Array} a copy of the specified array
        */
        arrays.copy = function (array) {
            return array.concat();
        };

        /**
        * Swaps the elements at the specified positions in the specified array.
        * @param {Array} array The array in which to swap elements.
        * @param {number} i the index of one element to be swapped.
        * @param {number} j the index of the other element to be swapped.
        * @return {boolean} true if the array is defined and the indexes are valid.
        */
        arrays.swap = function (array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        };

        arrays.toString = function (array) {
            return '[' + array.toString() + ']';
        };

        /**
        * Executes the provided function once for each element present in this array
        * starting from index 0 to length - 1.
        * @param {Array} array The array in which to iterate.
        * @param {function(Object):*} callback function to execute, it is
        * invoked with one argument: the element value, to break the iteration you can
        * optionally return false.
        */
        arrays.forEach = function (array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        };
        return arrays;
    })();
    mshell.arrays = arrays;
})(mshell || (mshell = {}));

// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
/**
* @namespace Top level namespace for collections, a TypeScript data structure library.
*/
var mshell;
(function (mshell) {
    

    

    

    var collections = (function () {
        function collections() {
        }
        /**
        * Default function to compare element order.
        * @function
        */
        collections.defaultCompare = function (a, b) {
            if (a < b) {
                return -1;
            } else if (a === b) {
                return 0;
            } else {
                return 1;
            }
        };

        /**
        * Default function to test equality.
        * @function
        */
        collections.defaultEquals = function (a, b) {
            return a === b;
        };

        /**
        * Default function to convert an object to a string.
        * @function
        */
        collections.defaultToString = function (item) {
            if (item === null) {
                return 'COLLECTION_NULL';
            } else if (collections.isUndefined(item)) {
                return 'COLLECTION_UNDEFINED';
            } else if (collections.isString(item)) {
                return item;
            } else {
                return item.toString();
            }
        };

        /**
        * Joins all the properies of the object using the provided join string
        */
        collections.makeString = function (item, join) {
            if (typeof join === "undefined") { join = ","; }
            if (item === null) {
                return 'COLLECTION_NULL';
            } else if (collections.isUndefined(item)) {
                return 'COLLECTION_UNDEFINED';
            } else if (collections.isString(item)) {
                return item.toString();
            } else {
                var toret = "{";
                var first = true;
                for (var prop in item) {
                    if (item.hasOwnProperty(prop)) {
                        if (first)
                            first = false;
                        else
                            toret = toret + join;
                        toret = toret + prop + ":" + item[prop];
                    }
                }
                return toret + "}";
            }
        };

        /**
        * Checks if the given argument is a function.
        * @function
        */
        collections.isFunction = function (func) {
            return (typeof func) === 'function';
        };

        /**
        * Checks if the given argument is undefined.
        * @function
        */
        collections.isUndefined = function (obj) {
            return (typeof obj) === 'undefined';
        };

        /**
        * Checks if the given argument is a string.
        * @function
        */
        collections.isString = function (obj) {
            return Object.prototype.toString.call(obj) === '[object String]';
        };

        /**
        * Reverses a compare function.
        * @function
        */
        collections.reverseCompareFunction = function (compareFunction) {
            if (!collections.isFunction(compareFunction)) {
                return function (a, b) {
                    if (a < b) {
                        return 1;
                    } else if (a === b) {
                        return 0;
                    } else {
                        return -1;
                    }
                };
            } else {
                return function (d, v) {
                    return compareFunction(d, v) * -1;
                };
            }
        };

        /**
        * Returns an equal function given a compare function.
        * @function
        */
        collections.compareToEquals = function (compareFunction) {
            return function (a, b) {
                return compareFunction(a, b) === 0;
            };
        };
        return collections;
    })();
    mshell.collections = collections;
})(mshell || (mshell = {})); // End of module

/// <reference path="collections.ts" />
var mshell;
(function (mshell) {
    

    var Dictionary = (function () {
        /**
        * Creates an empty dictionary.
        * @class <p>Dictionaries map keys to values; each key can map to at most one value.
        * This implementation accepts any kind of objects as keys.</p>
        *
        * <p>If the keys are custom objects a function which converts keys to unique
        * strings must be provided. Example:</p>
        * <pre>
        * function petToString(pet) {
        *  return pet.name;
        * }
        * </pre>
        * @constructor
        * @param {function(Object):string=} toStrFunction optional function used
        * to convert keys to strings. If the keys aren't strings or if toString()
        * is not appropriate, a custom function which receives a key and returns a
        * unique string must be provided.
        */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || mshell.collections.defaultToString;
        }
        /**
        * Returns the value to which this dictionary maps the specified key.
        * Returns undefined if this dictionary contains no mapping for this key.
        * @param {Object} key key whose associated value is to be returned.
        * @return {*} the value to which this dictionary maps the specified key or
        * undefined if the map contains no mapping for this key.
        */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table[this.toStr(key)];
            if (mshell.collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };

        /**
        * Associates the specified value with the specified key in this dictionary.
        * If the dictionary previously contained a mapping for this key, the old
        * value is replaced by the specified value.
        * @param {Object} key key with which the specified value is to be
        * associated.
        * @param {Object} value value to be associated with the specified key.
        * @return {*} previous value associated with the specified key, or undefined if
        * there was no mapping for the key or if the key/value are undefined.
        */
        Dictionary.prototype.setValue = function (key, value) {
            if (mshell.collections.isUndefined(key) || mshell.collections.isUndefined(value)) {
                return undefined;
            }

            var ret;
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (mshell.collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };

        /**
        * Removes the mapping for this key from this dictionary if it is present.
        * @param {Object} key key whose mapping is to be removed from the
        * dictionary.
        * @return {*} previous value associated with specified key, or undefined if
        * there was no mapping for key.
        */
        Dictionary.prototype.remove = function (key) {
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (!mshell.collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };

        Object.defineProperty(Dictionary.prototype, "keys", {
            /**
            * Returns an array containing all of the keys in this dictionary.
            * @return {Array} an array containing all of the keys in this dictionary.
            */
            get: function () {
                var array = [];
                for (var name in this.table) {
                    if (this.table.hasOwnProperty(name)) {
                        var pair = this.table[name];
                        array.push(pair.key);
                    }
                }
                return array;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Dictionary.prototype, "values", {
            /**
            * Returns an array containing all of the values in this dictionary.
            * @return {Array} an array containing all of the values in this dictionary.
            */
            get: function () {
                var array = [];
                for (var name in this.table) {
                    if (this.table.hasOwnProperty(name)) {
                        var pair = this.table[name];
                        array.push(pair.value);
                    }
                }
                return array;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (this.table.hasOwnProperty(name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };

        /**
        * Returns true if this dictionary contains a mapping for the specified key.
        * @param {Object} key key whose presence in this dictionary is to be
        * tested.
        * @return {boolean} true if this dictionary contains a mapping for the
        * specified key.
        */
        Dictionary.prototype.containsKey = function (key) {
            return !mshell.collections.isUndefined(this.getValue(key));
        };

        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };

        Object.defineProperty(Dictionary.prototype, "length", {
            /**
            * Returns the number of keys in this dictionary.
            * @return {number} the number of key-value mappings in this dictionary.
            */
            get: function () {
                return this.nElements;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Dictionary.prototype, "isEmpty", {
            /**
            * Returns true if this dictionary contains no mappings.
            * @return {boolean} true if this dictionary contains no mappings.
            */
            get: function () {
                return this.nElements <= 0;
            },
            enumerable: true,
            configurable: true
        });

        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    mshell.Dictionary = Dictionary;
})(mshell || (mshell = {}));

/// <reference path="collections.ts" />
/// <reference path="arrays.ts" />
var mshell;
(function (mshell) {
    

    var List = (function () {
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        function List() {
            /**
            * First node in the list
            * @type {Object}
            * @private
            */
            this.firstNode = null;
            /**
            * Last node in the list
            * @type {Object}
            * @private
            */
            this.lastNode = null;
            /**
            * Number of elements in the list
            * @type {number}
            * @private
            */
            this.nElements = 0;
        }
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        List.prototype.add = function (item, index) {
            if (mshell.collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || mshell.collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                // First node in the list.
                this.firstNode = newNode;
                this.lastNode = newNode;
            } else if (index === this.nElements) {
                // Insert at the end.
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            } else if (index === 0) {
                // Change first node.
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            } else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };

        Object.defineProperty(List.prototype, "first", {
            /**
            * Returns the first element in this list.
            * @return {*} the first element of the list or undefined if the list is
            * empty.
            */
            get: function () {
                if (this.firstNode !== null) {
                    return this.firstNode.element;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(List.prototype, "last", {
            /**
            * Returns the last element in this list.
            * @return {*} the last element in the list or undefined if the list is
            * empty.
            */
            get: function () {
                if (this.lastNode !== null) {
                    return this.lastNode.element;
                }
                return undefined;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns the element at the specified position in this list.
        * @param {number} index desired index.
        * @return {*} the element at the given index or undefined if the index is
        * out of bounds.
        */
        List.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };

        /**
        * Returns the index in this list of the first occurrence of the
        * specified element, or -1 if the List does not contain this element.
        * <p>If the elements inside this list are
        * not comparable with the === operator a custom equals function should be
        * provided to perform searches, the function must receive two arguments and
        * return true if they are equal, false otherwise. Example:</p>
        *
        * <pre>
        * var petsAreEqualByName = function(pet1, pet2) {
        *  return pet1.name === pet2.name;
        * }
        * </pre>
        * @param {Object} item element to search for.
        * @param {function(Object,Object):boolean=} equalsFunction Optional
        * function used to check if two elements are equal.
        * @return {number} the index in this list of the first occurrence
        * of the specified element, or -1 if this list does not contain the
        * element.
        */
        List.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || mshell.collections.defaultEquals;
            if (mshell.collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };

        /**
        * Returns true if this list contains the specified element.
        * <p>If the elements inside the list are
        * not comparable with the === operator a custom equals function should be
        * provided to perform searches, the function must receive two arguments and
        * return true if they are equal, false otherwise. Example:</p>
        *
        * <pre>
        * var petsAreEqualByName = function(pet1, pet2) {
        *  return pet1.name === pet2.name;
        * }
        * </pre>
        * @param {Object} item element to search for.
        * @param {function(Object,Object):boolean=} equalsFunction Optional
        * function used to check if two elements are equal.
        * @return {boolean} true if this list contains the specified element, false
        * otherwise.
        */
        List.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };

        /**
        * Removes the first occurrence of the specified element in this list.
        * <p>If the elements inside the list are
        * not comparable with the === operator a custom equals function should be
        * provided to perform searches, the function must receive two arguments and
        * return true if they are equal, false otherwise. Example:</p>
        *
        * <pre>
        * var petsAreEqualByName = function(pet1, pet2) {
        *  return pet1.name === pet2.name;
        * }
        * </pre>
        * @param {Object} item element to be removed from this list, if present.
        * @return {boolean} true if the list contained the specified element.
        */
        List.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || mshell.collections.defaultEquals;
            if (this.nElements < 1 || mshell.collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;

            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    } else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    } else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };

        /**
        * Removes all of the elements from this list.
        */
        List.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };

        /**
        * Returns true if this list is equal to the given list.
        * Two lists are equal if they have the same elements in the same order.
        * @param {List} other the other list.
        * @param {function(Object,Object):boolean=} equalsFunction optional
        * function used to check if two elements are equal. If the elements in the lists
        * are custom objects you should provide a function, otherwise
        * the === operator is used to check equality between elements.
        * @return {boolean} true if this list is equal to the given list.
        */
        List.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || mshell.collections.defaultEquals;
            if (!(other instanceof List)) {
                return false;
            }
            if (this.length !== other.length) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };

        /**
        * @private
        */
        List.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };

        /**
        * Removes the element at the specified position in this list.
        * @param {number} index given index.
        * @return {*} removed element or undefined if the index is out of bounds.
        */
        List.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                //First node in the list.
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            } else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                } else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };

        /**
        * Executes the provided function once for each element present in this list in order.
        * @param {function(Object):*} callback function to execute, it is
        * invoked with one argument: the element value, to break the iteration you can
        * optionally return false.
        */
        List.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };

        /**
        * Reverses the order of the elements in this linked list (makes the last
        * element first, and the first element last).
        */
        List.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };

        /**
        * Returns an array containing all of the elements in this list in proper
        * sequence.
        * @return {Array.<*>} an array containing all of the elements in this list,
        * in proper sequence.
        */
        List.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };

        Object.defineProperty(List.prototype, "length", {
            /**
            * Returns the number of elements in this list.
            * @return {number} the number of elements in this list.
            */
            get: function () {
                return this.nElements;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(List.prototype, "isEmpty", {
            /**
            * Returns true if this list contains no elements.
            * @return {boolean} true if this list contains no elements.
            */
            get: function () {
                return this.nElements <= 0;
            },
            enumerable: true,
            configurable: true
        });

        List.prototype.toString = function () {
            return mshell.arrays.toString(this.toArray());
        };

        /**
        * @private
        */
        List.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };

        /**
        * @private
        */
        List.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return List;
    })();
    mshell.List = List;
})(mshell || (mshell = {}));

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

var mshell;
(function (mshell) {
    var AnimBounce = (function () {
        function AnimBounce() {
        }
        AnimBounce.easeOut = function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75))
                return c * (7.5625 * t * t) + b;
            else if (t < (2 / 2.75))
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            else if (t < (2.5 / 2.75))
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            else
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        };

        AnimBounce.easeIn = function (t, b, c, d) {
            return c - AnimBounce.easeOut(d - t, 0.0, c, d) + b;
        };

        AnimBounce.easeInOut = function (t, b, c, d) {
            if (t < d * 0.5)
                return AnimBounce.easeIn(t * 2, 0.0, c, d) * 0.5 + b;
            else
                return AnimBounce.easeOut(t * 2 - d, 0.0, c, d) * 0.5 + c * 0.5 + b;
        };
        return AnimBounce;
    })();
    mshell.AnimBounce = AnimBounce;
})(mshell || (mshell = {}));

var mshell;
(function (mshell) {
    var AnimCircular = (function () {
        function AnimCircular() {
        }
        AnimCircular.easeIn = function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };

        AnimCircular.easeOut = function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        };

        AnimCircular.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return -c * 0.5 * (Math.sqrt(1 - t * t) - 1) + b;
            return c * 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        };
        return AnimCircular;
    })();
    mshell.AnimCircular = AnimCircular;
})(mshell || (mshell = {}));

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

var mshell;
(function (mshell) {
    var AnimElastic = (function () {
        function AnimElastic() {
        }
        AnimElastic.easeIn = function (t, b, c, d) {
            return AnimElastic.easeInExtended(t, b, c, d, 0.0, 0.0);
        };

        AnimElastic.easeInExtended = function (t, b, c, d, a, p) {
            if (t == 0.0)
                return b;
            if ((t /= d) == 1.0)
                return b + c;
            if (p == 0.0)
                p = d * 0.3;

            var s = 0.0;

            if (a == 0.0 || a < Math.abs(c)) {
                a = c;
                s = p * 0.25;
            } else
                s = p / (2 * Math.PI) * Math.asin(c / a);

            return -(a * Math.pow(2, 10 * (--t)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        };

        AnimElastic.easeOut = function (t, b, c, d) {
            return AnimElastic.easeOutExtended(t, b, c, d, 0.0, 0.0);
        };

        AnimElastic.easeOutExtended = function (t, b, c, d, a, p) {
            if (t == 0.0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (p == 0.0)
                p = d * 0.3;

            var s = 0.0;

            if (a == 0.0 || a < Math.abs(c)) {
                a = c;
                s = p * 0.25;
            } else
                s = p / (2 * Math.PI) * Math.asin(c / a);

            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        };

        AnimElastic.easeInOut = function (t, b, c, d) {
            return AnimElastic.easeInOutExtended(t, b, c, d, 0.0, 0.0);
        };

        AnimElastic.easeInOutExtended = function (t, b, c, d, a, p) {
            if (t == 0.0)
                return b;
            if ((t /= d * 0.5) == 2)
                return b + c;
            if (p == 0.0)
                p = d * (0.3 * 1.5);

            var s = 0.0;
            if (a == 0 || a < Math.abs(c)) {
                a = c;
                s = p * 0.25;
            } else
                s = p / (2 * Math.PI) * Math.asin(c / a);

            if (t < 1.0)
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;

            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        };
        return AnimElastic;
    })();
    mshell.AnimElastic = AnimElastic;
})(mshell || (mshell = {}));

var mshell;
(function (mshell) {
    var AnimExponential = (function () {
        function AnimExponential() {
        }
        AnimExponential.easeIn = function (t, b, c, d) {
            return t == 0.0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        };

        AnimExponential.easeOut = function (t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };

        AnimExponential.easeInOut = function (t, b, c, d) {
            if (t == 0.0)
                return b;

            if (t == d)
                return b + c;

            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * Math.pow(2, 10 * (t - 1)) + b;

            return c * 0.5 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
        return AnimExponential;
    })();
    mshell.AnimExponential = AnimExponential;
})(mshell || (mshell = {}));

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

var mshell;
(function (mshell) {
    var AnimQuadratic = (function () {
        function AnimQuadratic() {
        }
        AnimQuadratic.easeIn = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };

        AnimQuadratic.easeOut = function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };

        AnimQuadratic.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * t * t + b;
            return -c * 0.5 * ((--t) * (t - 2) - 1) + b;
        };
        return AnimQuadratic;
    })();
    mshell.AnimQuadratic = AnimQuadratic;
})(mshell || (mshell = {}));

var mshell;
(function (mshell) {
    var AnimQuartic = (function () {
        function AnimQuartic() {
        }
        AnimQuartic.easeIn = function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };

        AnimQuartic.easeOut = function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };

        AnimQuartic.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * t * t * t * t + b;
            return -c * 0.5 * ((t -= 2) * t * t * t - 2) + b;
        };
        return AnimQuartic;
    })();
    mshell.AnimQuartic = AnimQuartic;
})(mshell || (mshell = {}));

var mshell;
(function (mshell) {
    var AnimQuintic = (function () {
        function AnimQuintic() {
        }
        AnimQuintic.easeIn = function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };

        AnimQuintic.easeOut = function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };

        AnimQuintic.easeInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1.0)
                return c * 0.5 * t * t * t * t * t + b;
            return c * 0.5 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        return AnimQuintic;
    })();
    mshell.AnimQuintic = AnimQuintic;
})(mshell || (mshell = {}));

var mshell;
(function (mshell) {
    var AnimSine = (function () {
        function AnimSine() {
        }
        AnimSine.easeIn = function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI * 0.5)) + c + b;
        };

        AnimSine.easeOut = function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI * 0.5)) + b;
        };

        AnimSine.easeInOut = function (t, b, c, d) {
            return -c * 0.5 * (Math.cos(Math.PI * t / d) - 1) + b;
        };
        return AnimSine;
    })();
    mshell.AnimSine = AnimSine;
})(mshell || (mshell = {}));

/// <reference path="iHiResTimerCounter.ts" />
var mshell;
(function (mshell) {
    /*
    * Provides a high-resolution timer.
    *
    * <p>The resolution of the timer varies by system. You can determine the resolution of a given
    * HiResTimer instance by calling one of the ResolutionXXX methods.</p>
    *
    * <p>To use HiResTimer create a new instance and call Start() - or pass true to the constructor.
    * Call Stop() to stop a running timer. Call Start() to restart a stopped timer.
    * Call Start(true) to restart and reset a stopped timer. Call one of the ElapsedXXX methods
    * on a running or stopped timer to get the elapsed time in the units you prefer.
    * Check the IsRunning property to determine if the timer is running.</p>
    *
    * <code>
    *     int sleepCount = 750;
    *     String formattedCount = sleepCount.toString();
    *
    *     HiResTimer timer = new HiResTimer();
    *
    *     print("Timer resolution: ");
    *     print(timer.resolution() + " seconds, ");
    *     print(timer.resolutionMilliseconds() + "milliseconds, ");
    *     print(timer.resolutionMicroseconds() + "microseconds.");
    *
    *     //----- Start the timer then go to sleep.
    *     timer.start();
    *     print("Timer started: sleeping for " + formattedCount + " milliseconds.");
    *
    *     // Time will accumulate for this sleep because the timer is running.
    *     Thread.sleep(sleepCount);
    *
    *     //----- Pause the timer
    *     timer.stop();
    *
    *     print("Timer paused: sleeping for " + formattedCount + " milliseconds.");
    *
    *     //----- Time will not accumulate for this sleep because the timer is paused.
    *     Thread.sleep(sleepCount);
    *
    *     //----- Restart the timer and go back to sleep
    *     timer.start();
    *     print("Timer restarted: sleeping for " + formattedCount + " milliseconds.");
    *
    *     //----- Time will accumulate for this sleep because the timer is running.
    *     Thread.sleep(sleepCount);
    *
    *     //----- Stop timing and output the results.
    *     timer.stop();
    *
    *     print("Timer stopped\n");
    *     print("Run Time: ");
    *     print(timer.Elapsed() + " seconds, ");
    *     print(timer.ElapsedMilliseconds() + "milliseconds, ");
    *     print(timer.ElapsedMicroseconds() + "microseconds.");
    *
    * </code>
    */
    var HiResTimer = (function () {
        /*
        * Initializes a new instance and starts the timer if passed true.
        * @param {boolean} [bStartTimer] Controls whether the timer is started after the HiResTimer is initialized.
        */
        function HiResTimer(counter, bStartTimer) {
            if (typeof bStartTimer === "undefined") { bStartTimer = false; }
            this._counter = null;
            /*
            * Stores the start count or the elapsed ticks depending on context.
            */
            this._start = 0;
            /*
            * Stores the amount of time to adjust the results of the timer to account
            * for the time it takes to run the HiResTimer code.
            */
            this._adjustment = 0;
            this._counter = counter;
            this.init(bStartTimer);
        }
        /*
        * Initializes the HiResTimer mshellCtls. Does all the heavy lifting for the public constructors.
        * @param {boolean} [bStartTimer] Controls whether the timer is started after the HiResTimer is initialized.</param>
        */
        HiResTimer.prototype.init = function (bStartTimer) {
            //----- If the adjustment value hasn't been calculated yet then calculate it.
            if (this._adjustment == 0) {
                //----- Time the timer code so we will know how much of an adjustment
                //----- is needed.
                this._start = 0;
                this._adjustment = 0;
                this.start(false);
                this.stop();
                this._adjustment = this._start;
            }

            //----- The following needs to happen every time we initialize
            this._start = 0;
            if (bStartTimer)
                this.start(false);
        };

        /*
        * Start the timer.
        * @param {boolean} [bResetTimer] Controls whether the timer is reset before starting.
        * Pass false and any new elapsed time will be added to the existing elapsed time.
        * Pass true and any existing elapsed time is lost and only the new elapsed time is preserved.
        */
        HiResTimer.prototype.start = function (bResetTimer) {
            if (typeof bResetTimer === "undefined") { bResetTimer = false; }
            var count = this._counter.count;

            if ((!bResetTimer) && (0 > this._start))
                this._start += count; // We are starting with an accumulated time
            else
                this._start = count; // We are starting from 0
        };

        /*
        * Stop timing. Call one of the ElapsedXXX methods to get the elapsed time since Start() was
        * called. Call Start(false) to restart the timer where you left off. Call Start(true) to
        * restart the timer from 0.
        */
        HiResTimer.prototype.stop = function () {
            if (this._start <= 0) {
                return;
            }
            this._start = this.elapsedTicks();
        };

        HiResTimer.prototype.elapsedTicks = function () {
            var elapsedTicks = this._start;

            var count = this._counter.count;

            elapsedTicks += -count; // Stopped timer keeps elapsed timer ticks as a negative

            if (elapsedTicks < this._adjustment)
                elapsedTicks -= this._adjustment; // Adjust for time timer code takes to run, but don't overflow
            else
                elapsedTicks = 0; // Stop must have been called directly after Start

            return elapsedTicks;
        };

        /*
        * Indicates whether the timer is running or not.
        */
        HiResTimer.prototype.isRunning = function () {
            //----- Returns FALSE if stopped.
            var result = (this._start > 0);
            return result;
        };

        /*
        * Returns the number of seconds elapsed since the timer started.
        * <returns>The number of seconds elapsed.
        */
        HiResTimer.prototype.elapsed = function () {
            return -this.elapsedTicks() / this._counter.frequency;
        };

        /*
        * Returns the number of milliseconds elapsed since the timer started.
        * @return {number} The number of milliseconds elapsed.
        */
        HiResTimer.prototype.elapsedMilliseconds = function () {
            return (-this.elapsedTicks() * 1000) / this._counter.frequency;
        };

        /*
        * Returns the number of microseconds elapsed since the timer started.
        * @return {number} The number of microseconds elapsed.
        */
        HiResTimer.prototype.elapsedMicroseconds = function () {
            return (-this.elapsedTicks() * 1000000) / this._counter.frequency;
        };

        /*
        * Returns the timer resolution in seconds.
        * @return {number} Then number of seconds of resolution.
        */
        HiResTimer.prototype.resolution = function () {
            return 1.0 / this._counter.frequency;
        };

        /*
        * Returns the timer resolution in milliseconds.
        * @return {number} Then number of milliseconds of resolution.
        */
        HiResTimer.prototype.resolutionMilliseconds = function () {
            return 1000.0 / this._counter.frequency;
        };

        /*
        * Returns the timer resolution in microseconds.
        * @return {number} Then number of microseconds of resolution.
        */
        HiResTimer.prototype.resolutionMicroseconds = function () {
            return 1000000.0 / this._counter.frequency;
        };
        return HiResTimer;
    })();
    mshell.HiResTimer = HiResTimer;
})(mshell || (mshell = {}));

/// <reference path="iHiResTimerCounter.ts" />
var mshell;
(function (mshell) {
    var HiResTimerCounterBrowser = (function () {
        function HiResTimerCounterBrowser() {
            this._frequency = 1000;
        }
        Object.defineProperty(HiResTimerCounterBrowser.prototype, "frequency", {
            /*
            * Stores the frequency of the high-resolution performance counter.
            * This value cannot change while the system is running.
            */
            get: function () {
                return this._frequency;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HiResTimerCounterBrowser.prototype, "count", {
            get: function () {
                return window.performance.now();
            },
            enumerable: true,
            configurable: true
        });

        HiResTimerCounterBrowser.prototype.newCounter = function () {
            return new HiResTimerCounterBrowser();
        };
        return HiResTimerCounterBrowser;
    })();
    mshell.HiResTimerCounterBrowser = HiResTimerCounterBrowser;
})(mshell || (mshell = {}));

