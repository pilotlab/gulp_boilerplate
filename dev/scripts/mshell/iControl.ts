
/// <reference path='iRoot.ts' />
/// <reference path='proxies/point.ts' />
/// <reference path='events.ts' />

    
    
module mshell
{
    export interface IControl
    {
        //=====             Required Properties
        controls:           Controls;
        parent:             IControl;
        root:               IRoot;

        nestLevel:          number;
        
        x:                  number;
        left:               number;
        leftActual:         number;
        leftAbs:            number;

        y:                  number;
        top:                number;
        topActual:          number;
        topAbs:             number;

        bottom:             number;
        right:              number;

        width:              number;
        widthActual:        number;
        widthAbs:           number;
        isWidthSet:         boolean;

        height:             number;
        heightActual:       number;
        heightAbs:          number;
        isHeightSet:        boolean;

        scale:              number;
        scaleWidth:         number;
        scaleWidthAbs:      number;
        scaleHeight;
        scaleHeightAbs;

        rotation:           number;
        rotationX:          number;
        rotationY:          number;
        rotationZ:          number;
      
        anchorPoint:        Point;
        
        opacity:            number;
        opacityAbs:         number;
        opacityMin:         number;

        z:                  number;
        zIndex:             number;

        isVisible:                  boolean;
        isAllowMouseEvents:         boolean;
        isClipChildControls:        boolean;
        isAspectRatioMaintained:    boolean;
        isScaleChildren:            boolean;

        isMouseLeftButtonDown:      boolean;
        isMouseRightButtonDown:     boolean;
        isPreviewMouseOver:         boolean;
        isMouseOver:                boolean;
        
        mouseLeftButtonDownArgs:    MouseEventArgs;
        mouseRightButtonDownArgs:   MouseEventArgs;

        isInitialized: boolean;
        isLoaded: boolean; // Used for conrols that load content, like images.
        isInvalidated: boolean;
        isResized: boolean;
        isDisposed: boolean;

        //===== Required Methods

        //----- Be careful using this set of methods, as they allow
        //----- properties to be set without calling Invalidate() on the control.
        setXWithoutInvalidation(x: number): void;
        setYWithoutInvalidation(y: number): void;
        setLeftWithoutInvalidation(left: number): void;
        setTopWithoutInvalidation(top: number): void;
        setLeftActualWithoutInvalidation(left: number): void;
        setTopActualWithoutInvalidation(top: number): void;
        setWidthWithoutInvalidation(width: number): void;
        setHeightWithoutInvalidation(height: number): void;
        setScaleWidthWithoutInvalidation(scale: number): void;
        setScaleHeightWithoutInvalidation(scale: number): void;
        setRotationXWithoutInvalidation(rotation: number): void;
        setRotationYWithoutInvalidation(rotation: number): void;
        setRotationZWithoutInvalidation(rotation: number): void;

        invalidate(): void;
        tick(): boolean;
        render(): void;

        /**
        * Takes an X value relative to the Control and applies transforms 
        * according to the current scaling of the Control.
        * 
        * @param {number} [x] The X value to transform.
        * @return {number} [x] The X value transformed relative to the parent of the current Control.
        */
        getXTransformed(x: number): number;

        /**
        * Takes an Y value relative to the Control and applies transforms 
        * according to the current scaling of the Control.
        *
        * @param {number} [y] The Y value to transform.
        * @return {number} The Y value transformed relative to the parent of the current Control.
        */
        getYTransformed(y: number): number;

        /**
        * Takes an Z value relative to the Control and applies transforms 
        * according to the current scaling of the Control.
        *
        * @return {number} The Z value transformed relative to the parent of the current Control.
        * @param {number} [z] The Z value to transform.
        */
        getZTransformed(z: number): number;

        /**
        * This method takes a pt relative to the control's parent and applies transforms,
        * including scaling and rotation.
        * 
        * @param {Point} [Point}
        * @return {Point} A point relative to the control.</returns>
        */
        parentToLocal(pt: Point): Point;
        localToParent(pt: Point): Point;
        localToRoot(pt: Point): Point;

        moveToTop(): boolean;

        invalidateAll(): void;

        //===== Mouse Events
        checkMouseMove(e: MouseEventArgs): void;
        checkMouseLeftButtonDown(e: MouseEventArgs): void;
        checkMouseLeftButtonUp(e: MouseEventArgs): void;
        checkMouseRightButtonDown(e: MouseEventArgs): void;
        checkMouseRightButtonUp(e: MouseEventArgs): void;
        checkMouseWheel(e: MouseEventArgs): void;

        doLoaded(): void;

        doMouseClick(e: MouseEventArgs): void;
        doPreviewMouseEnter(e: MouseEventArgs): void;
        doMouseEnter(e: MouseEventArgs): void;
        doPreviewMouseLeave(e: MouseEventArgs): void;
        doMouseLeave(e: MouseEventArgs): void;
        doMouseMove(e: MouseEventArgs): void;
        doPreviewMouseMove(e: MouseEventArgs): void;
        doMouseLeftButtonDown(e: MouseEventArgs): void;
        doMouseLeftButtonUp(e: MouseEventArgs): void;
        doMouseRightButtonDown(e: MouseEventArgs): void;
        doMouseRightButtonUp(e: MouseEventArgs): void;
        doMouseWheel(e: MouseEventArgs): void;

        doResized(ControlEventArgs e): void;

        initialized: Signal<ControlEventArgs>;
        loaded: Signal<ControlEventArgs>;
        attachedToControlSystem: Signal<ControlEventArgs>;
        removedFromControlSystem: Signal<ControlEventArgs>;
        resized: Signal<ControlEventArgs>;

        mouseEnter: Signal<MouseEventArgs>;
        previewMouseEnter: Signal<MouseEventArgs>;
        mouseLeave: Signal<MouseEventArgs>;
        previewMouseLeave: Signal<MouseEventArgs>;
        mouseClick: Signal<MouseEventArgs>;
        mouseMove: Signal<MouseEventArgs>;
        previewMouseMove: Signal<MouseEventArgs>;
        mouseLeftButtonDown: Signal<MouseEventArgs>;
        previewMouseLeftButtonDown: Signal<MouseEventArgs>;
        mouseLeftButtonUp: Signal<MouseEventArgs>;
        previewMouseLeftButtonUp: Signal<MouseEventArgs>;
        mouseRightButtonDown: Signal<MouseEventArgs>;
        previewMouseRightButtonDown: Signal<MouseEventArgs>;
        mouseRightButtonUp: Signal<MouseEventArgs>;
        previewMouseRightButtonUp: Signal<MouseEventArgs>;
        mouseWheel: Signal<MouseEventArgs>;
        previewMouseWheel: Signal<MouseEventArgs>;

        propertyChanged: Signal<PropertyChangedEventArgs>;

        //===== Animation methods
        //----- moveTo
        /*moveTo(targetX: number, targetY: number, targetZ: number, duration: number): AnimWrapper;
        moveTo(targetX: number, targetY: number, targetZ: number, duration: number, ease: Function): AnimWrapper;
        moveTo(targetX: number, targetY: number, targetZ: number, duration: number, ease: Function, doneHandler: Function): AnimWrapper;
        //----- moveBy
        moveBy(num offsetX, num offsetY, num offsetZ, num duration, [Function ease, Function doneHandler]): AnimWrapper;
        //----- rotateTo
        rotateTo(num rotationX, num rotationY, num rotationZ, num duration, [Function ease, Function doneHandler]): AnimWrapper;
        //----- rotateBy
        rotateBy(num offsetX, num offsetY, num offsetZ, num duration, [Function ease, Function doneHandler]): AnimWrapper;
        //----- fadeTo
        fadeTo(num opacityTarget, num duration, [Function ease, Function doneHandler]): AnimWrapper;
        //----- pause
        pause(num duration, [Function doneHandler]): AnimWrapper;
        //----- sizeTo
        sizeTo(num targetX, num targetY, num duration, [bool bScaleChildren, Function ease, Function doneHandler]): AnimWrapper;*/
    }
}