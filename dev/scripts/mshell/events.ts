
/// <reference path='collections/list.ts' />
/// <reference path='signal.ts' />
/// <reference path='iControl.ts' />
/// <reference path='proxies/point.ts' />
    
    
module mshell
{
    export class EventArgs
    {
        constructor() {}
        static empty: EventArgs = new EventArgs();
        args: List<any> = new List<any>();
    }
    
    
    /*====================================================================*
      START: INotifyPropertyChanged
     *====================================================================*/
    export interface INotifyPropertyChanged
    {
        propertyChanged: Signal<PropertyChangedEventArgs<any>>;
    }


    export class PropertyChangedEventArgs<T> extends EventArgs
    {
        constructor(propertyName: string, value: T)
        {
            super();
            this.propertyName = propertyName;
            this.value = value;
        }

        propertyName: string;
        value: T;
    }


    /*====================================================================*
      START: ControlEventArgs
     *====================================================================*/
    export class ControlEventArgs extends EventArgs
    {
        constructor(control: IControl) 
        { 
            super();
            this.control = control; 
        }
        
        control: IControl;
    }
    
    
    /*====================================================================*
      START: MouseEventArgs
     *====================================================================*/
    export enum MouseButtonState
    {
        PRESSED,
        RELEASED
    }


    export class MouseButtons
    {
        left: MouseButtonState = MouseButtonState.RELEASED;
        right: MouseButtonState = MouseButtonState.RELEASED;
        middle: MouseButtonState = MouseButtonState.RELEASED;
        xButton1: MouseButtonState = MouseButtonState.RELEASED;
        xButton2: MouseButtonState = MouseButtonState.RELEASED;
    }


    export class MouseEventArgs extends EventArgs
    {
        constructor( sender: IControl, buttons: MouseButtons, clickCount: number, positionRoot: Point, positionLocal: Point, wheelDelta: number)
        {
            super();
            this.sender = sender;
            this.buttons = buttons;
            this.clickCount = clickCount;
            this.positionRoot = positionRoot;
            this.positionLocal = positionLocal;
            this.wheelDelta = wheelDelta;
        }

        sender: IControl;
        buttons: MouseButtons;
        clickCount: number;
        wheelDelta: number;
        positionRoot: Point;
        positionLocal: Point;
        isHandled: boolean = false;
        //dragAttributes: Attributes = new Attributes();
    }
    
    
    /*====================================================================*
      START: AnimEventArgs
     *====================================================================*/
    export class AnimEventArgs extends EventArgs
    {
        constructor(p: number) 
        { 
            super();
            this.p = p; 
        }
        
        p: number;
    }
}