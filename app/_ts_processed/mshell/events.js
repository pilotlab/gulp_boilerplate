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
