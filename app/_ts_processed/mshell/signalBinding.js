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
