module mshell
{
    /*
    * IRoot is the root of an MShell control system.
    */
    export interface IRoot
    {
        //----- Required Properties
        is3DEnabled: boolean;
        
        //----- Required Properties
        isRenderedOnTimer: boolean;
        //renderer: IRenderer;

        /*
        * Holds a reference to the control that currently has a mousedown.
        */
        controlMouseLeftButtonDown: IControl;
        controlMouseRightButtonDown: IControl;

        /*
        * Holds references to the controls that currently have a mousemove.
        */
        controlsMouseMove: List<IControl>;
        controlsMouseMoveLast: List<IControl>;

        /*
        * The point where the mouse cursor was last detected.
        */
        lastMousePosition: Point;

        fps: number;
        fpsActual: number;

        //keyDown: Signal<KeyEventArgs>;
        //doKeyDown: void (e: KeyEventArgs);

        //keyUp: Signal<KeyEventArgs>;
        //doKeyUp: void (e: KeyEventArgs);
    }
}