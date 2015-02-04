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
