
/// <reference path='iControl.ts' />
/// <reference path='animation/animManager.ts' />
/// <reference path='animation/animEase.ts' />
/// <reference path='proxies/coordSys.ts' />
    
    
module mshell
{
    export class ControlBase implements IControl, INotifyPropertyChanged
    {
        /*====================================================================*
        START: Constructor
        *====================================================================*/
        constructor()
        {
            try
            {
              this.p_colControls = new Controls(this);

              this.initialized.listen(this.p_control_onInitialize);
              this.resized.listen(this.p_control_onResized);
            
              this.mouseMove.listen(this.onMouseMove);
              this.mouseLeftButtonDown.listen(this.onMouseLeftButtonDown);
              this.mouseLeftButtonUp.listen(this.onMouseLeftButtonUp);
              this.mouseClick.listen(this.onMouseClick);
              this.mouseEnter.listen(this.onMouseEnter);
              this.mouseLeave.listen(this.onMouseLeave);
              this.mouseWheel.listen(this.onMouseWheel);

              this.previewMouseMove.listen(this.onPreviewMouseMove);
              this.previewMouseLeftButtonDown.listen(this.onPreviewMouseLeftButtonDown);
              this.previewMouseLeftButtonUp.listen(this.onPreviewMouseLeftButtonUp);
              this.previewMouseEnter.listen(this.onPreviewMouseEnter);
              this.previewMouseLeave.listen(this.onPreviewMouseLeave);
              this.previewMouseWheel.listen(this.onPreviewMouseWheel);

              this.anchorPoint.propertyChanged.listen(this.p_handleAnchorPointChanged);
            } 
            catch (e)
            {
                console.log('Error in Control constructor: ' + e);
            }
        }


        /*====================================================================*
        START: Properties
        *====================================================================*/
        get element(): HTMLElement { return this.p_elem; }
        p_elem: HTMLElement = new HTMLElement();
        
        
        //----- animate
        //----- To hook up animation, a IHiResTimerCounter must be applied to p_animate.timerCounter
        //----- and tick() must be called on the Root.
        get animate(): AnimManager { return this.p_animate; }
        p_animate: AnimManager = new AnimManager();


        //----- parent
        get parent(): IControl { return this.p_parent; }
        p_parent: IControl;


        //----- root
        get root(): IRoot { return this.p_root; }
        p_root: IRoot;


        //----- nestLevel
        /**
        * Gets the nest level, which indicates how many levels deep the control is nested within other controls.
        * The Root has a NestLevel of 0, while children of the root have a level of 1.
        */
        get nestLevel(): number { return this.p_nNestLevel; }
        p_nNestLevel: number = 0;


        //----- zIndex
        get zIndex(): number { return this.p_nZIndex; }
        p_nZIndex: number = 0;


        //----- controls
        get controls(): Controls { return this.p_colControls; }
        p_colControls: Controls;

        
        //----- isInitialized
        get isInitialized(): boolean { return this.p_bInitialized; }
        p_bInitialized: boolean = false;


        //----- rotation
        get rotation(): number { return this.p_rotation; }
        get rotationZ(): number { return this.p_rotation; }
        set rotation(value: number)
        {
            if (this.p_rotation != value)
            {
                this.p_rotation = value;
                this.invalidate();
                this.p_doPropertyChanged('rotation', value);
            }
        }
        set rotationZ(value: number) { this.rotation = value; }
        p_rotation: number = 0.0;
        setRotationZWithoutInvalidation(rotation: number): void { this.p_rotation = rotation; }


        //----- rotationX
        get rotationX(): number { return this.p_rotationX; }
        set rotationX(value: number)
        {
            if (this.p_rotationX != value)
            {
                this.p_rotationX = value;
                this.invalidate();
                this.p_doPropertyChanged('rotationX', value);
            }
        }
        p_rotationX: number = 0.0;
        setRotationXWithoutInvalidation(rotation: number): void { this.p_rotationX = rotation; }


        //----- rotationY
        get rotationY(): number { return this.p_rotationY; }
        set rotationY(value: number)
        {
            if (this.p_rotationY != value)
            {
                this.p_rotationY = value;
                this.invalidate();
                this.p_doPropertyChanged('rotationY', value);
            }
        }
        p_rotationY: number = 0.0;
        setRotationYWithoutInvalidation(rotation: number): void {  this.p_rotationY = rotation; }


        //----- opacity
        get opacity(): number { return this.p_opacity; }
        set opacity(value: number)
        {
            if (this.p_opacity != value)
            {
                this.p_opacity = value;

                if (this.p_parent != null) this.p_opacityAbs = this.p_parent.opacityAbs * this.p_opacity;
                else this.p_opacityAbs = this.p_opacity;
                this.invalidate();
                this.controls.updateOpacityAll();
                this.p_doPropertyChanged('opacity', value);
            }
        }
        p_opacity: number = 1.0;


        //----- opacityAbs
        get opacityAbs(): number { return this.p_opacityAbs; }
        p_opacityAbs: number = 1.0;


        //----- opacityMin
        /**
        * When the opacity is set below this level, the control won't be rendered and it won't receive mouse events.
        */
        opacityMin: number = 0.1;


        //----- isMouseLeftButtonDown
        get isMouseLeftButtonDown(): boolean { return this.p_bMouseLeftButtonDown; }
        p_bMouseLeftButtonDown: boolean = false;


        //----- isMouseRightButtonDown
        get isMouseRightButtonDown(): boolean { return this.p_bMouseRightButtonDown; }
        p_bMouseRightButtonDown: boolean = false;


        //----- isPreviewMouseOver
        get isPreviewMouseOver(): boolean { return this.p_bPreviewMouseOver; }
        p_bPreviewMouseOver: boolean = false;


        //----- isMouseOver
        get isMouseOver(): boolean { return this.p_bMouseOver; }
        p_bMouseOver: boolean = false;


        //----- mouseLeftButtonDownArgs
        mouseLeftButtonDownArgs: MouseEventArgs;


        //----- mouseRightButtonDownArgs
        mouseRightButtonDownArgs: MouseEventArgs;


        //----- isAllowMouseEvents
        isAllowMouseEvents: boolean = false;


        //----- isVisible
        get isVisible(): boolean { return this.p_bVisible; }
        set isVisible(value: boolean)
        {
            if (this.p_bVisible != value)
            {
                this.p_bVisible = value;
                this.invalidate();
                this.p_doPropertyChanged('isVisible', value);
            }
        }
        p_bVisible: boolean = true;


        //----- isClipChildControls
        get isClipChildControls(): boolean { return this.p_bClipChildControls; }
        set isClipChildControls(value: boolean)
        { 
            this.p_bClipChildControls = value;
            this.invalidate();
            this.p_doPropertyChanged('isClipChildControls', value);
        }
        p_bClipChildControls: boolean = false;


        //----- isInvalidated
        get isInvalidated(): boolean { return this.p_bInvalidated; }
        p_bInvalidated: boolean = false;


        //----- isResized
        get isResized(): boolean { return this.p_bResized; }
        p_bResized: boolean = true;


        //----- z
        get z(): number { return this.p_z; }
        set z(value: number)
        {
            try
            {
                this.p_z = value;
                this.invalidate();
                this.p_doPropertyChanged('z', value);
            } 
            catch (e)
            {
                console.log('Error setting Z: ' + e);
            }
        }
        p_z: number = 0.0;


        /*--------------------------------------------------------------------*
          START: bounds maintenance
          All values are relative to the parent control
         *--------------------------------------------------------------------*/
        //----- x
        get x(): number { return this.p_x; }
        set x(value: number)
        { 
            this.setXWithoutInvalidation(value); 
            this.invalidate();
            this.p_doPropertyChanged('x', value);
        }
        p_x: number = 0.0;
        setXWithoutInvalidation(x: number): void 
        {
            this.p_x = x;
            this.p_left = this.p_x - (this.p_widthTarget * this.p_ptAnchor.x);
            this.p_leftActual = this.p_x - (this.p_widthActual * this.p_ptAnchor.x);
            this.p_right = this.p_left + this.p_widthTarget;
        }
        
        
        //----- left
        get left(): number { return this.p_left; }
        set left(value: number)
        {
            this.setLeftWithoutInvalidation(value);  
            this.invalidate();
            this.p_doPropertyChanged('left', value);
        }
        p_left: number = 0.0;
        setLeftWithoutInvalidation(left: number): void 
        {
            this.p_left = left;
            this.p_x = this.p_left + (this.p_widthTarget * this.p_ptAnchor.x);
            this.p_leftActual = this.p_x - (this.p_widthActual * this.p_ptAnchor.x);
            this.p_right = this.p_left + this.p_widthTarget;
        }


        //----- leftActual
        /**
        * Applies the proper scaling to the left value for this Control, taking the scale of the control into account.
        * The left of the control, relative to it's parent, as it actually appears on the screen with scaling applied.
        */
        get leftActual(): number { return this.p_leftActual; }
        set leftActual(value: number)
        {
            this.setLeftActualWithoutInvalidation(value);
            this.invalidate();
            this.p_doPropertyChanged('leftActual', value);
        }
        setLeftActualWithoutInvalidation(leftActual: number): void
        {
            //----- Take the scaling of the control itself into account.
            this.setXWithoutInvalidation(leftActual + (this.p_widthActual * this.p_ptAnchor.x));
        }
        p_leftActual: number = 0.0;


        //----- leftAbs
        /**
        * The absolute left of the control as it appears on the screen, relative the Root.
        */
        get leftAbs(): number
        {
            var left: number = this.leftActual;
            var parent: IControl = this.p_parent;

            while (parent != null)
            {
              left *= parent.scaleWidth;
              left += parent.leftActual;
              parent = parent.parent;
            }

            return left;
        }


        //----- y
        get y(): number { return this.p_y; } 
        set y(value: number)
        { 
            this.setYWithoutInvalidation(value); 
            this.invalidate();
            this.p_doPropertyChanged('y', value);
        }
        p_y: number = 0.0;
        setYWithoutInvalidation(y: number): void
        {
            this.p_y = y;
            this.p_top = this.p_y - (this.p_heightTarget * this.p_ptAnchor.y);
            this.p_topActual = this.p_y - (this.p_heightActual * this.p_ptAnchor.y);
            this.p_bottom = this.p_top + this.p_heightTarget;
        }
        
        
        //----- top
        get top(): number { return this.p_top; }
        set top(value: number)
        {
            if (this.p_top != value)
            {
              this.setTopWithoutInvalidation(value);
              this.invalidate();
              this.p_doPropertyChanged('top', value);
            }
        }
        p_top: number = 0.0;
        setTopWithoutInvalidation(top: number): void
        {
            this.p_top = top;
            this.p_y = top + (this.p_heightTarget * this.p_ptAnchor.y); 
            this.p_topActual = this.p_y - (this.p_heightActual * this.p_ptAnchor.y);
            this.p_bottom = this.p_top + this.p_heightTarget;
        }


        //----- topActual
        /**
        * Applies the proper scaling to the Y value for this Control, taking the absolute scale of the control into account.
        * The top of the control, relative to it's parent, as it actually appears on the screen with scaling applied.
        */
        get topActual(): number { return this.p_topActual; }
        set topActual(value: number)
        {
            this.setTopActualWithoutInvalidation(value);
            this.invalidate();
            this.p_doPropertyChanged('topActual', value);
        }
        setTopActualWithoutInvalidation(topActual: number): void
        {
            //----- Take the scaling of the control itself into account.
            this.setYWithoutInvalidation(topActual + (this.p_heightActual * this.p_ptAnchor.y));
        }
        p_topActual: number = 0.0;


        //----- topAbs
        /**
        * The absolute top of the control as it appears on the screen, relative the Root.
        */
        get topAbs(): number
        {
            var top: number = this.topActual;
            var parent: IControl = this.p_parent;

            while (parent != null)
            {
              top *= parent.scaleHeight;
              top += parent.topActual;
              parent = parent.parent;
            }

            return top;
        }


        //----- bottom
        get bottom(): number { return this.p_bottom; }
        p_bottom: number = 100.0;

        //----- right
        get right(): number { return this.p_right; }
        p_right: number = 100.0;


        //----- width
        //----- The ideal width for the Root ctl
        /**
        * Gets or sets the targeted width for the control, independent of scale.
        */
        get width(): number { return this.p_widthTarget; }
        set width(value: number)
        {
            try
            {
              this.setWidthWithoutInvalidation(value);

              this.invalidate();
              this.p_doPropertyChanged('width', value);
              this.resized.dispatch(new ControlEventArgs(this));
            } 
            catch (e)
            {
              console.log('Error setting Width: ' + e.toString());
            }
        }
        get isWidthSet(): boolean { return this.p_bWidthSet; }
        p_bWidthSet: boolean = false;
        p_widthTarget: number = 100.0;

        /**
        * Sets the width without invalidating the control.
        */
        setWidthWithoutInvalidation(value: number): void
        {
          try
          {
            if (this.isAspectRatioMaintained)
            {
              var ratio: number = 0.0;
              if (this.p_widthTarget != 0.0) ratio = value / this.p_widthTarget;
              this.p_setHeight(this.p_heightTarget * ratio);
              this.p_setHeightActual(this.p_heightTarget * this.p_scaleHeight);
            }

            this.p_setWidth(value);
            this.p_setWidthActual(value * this.p_scaleWidth);
          } 
          catch (e)
          {
            console.log('Error setting Width: ' + e);
          }
        }
        p_setWidth(value: number): void
        {
          try
          {
            if (value < 0.5) value = 0.5;

            //---- first capture the old x position.
            var xTemp: number = this.p_left + (this.p_ptAnchor.x * this.p_widthTarget);
            //----- then change the width
            this.p_widthTarget = value;
            //----- now change the left based on the old x position.
            this.setLeftWithoutInvalidation(xTemp - (this.p_ptAnchor.x * this.p_widthTarget)); 

            this.p_bWidthSet = true;
          } 
          catch (e)
          {
            console.log('Error setting Width: ' + e);
          }
        }


        //----- widthActual
        /**
        * Gets or sets the actual width of the control relative to it's parent, taking scale into account.
        */
        get widthActual(): number { return this.p_widthActual; }
        set widthActual(value: number)
        {
            try
            {
              if (this.isAspectRatioMaintained)
              {
                var ratio: number = 0.0;
                if (this.p_widthActual != 0) ratio = value / this.p_widthActual;
                this.p_setScaleHeight(this.p_scaleHeight * ratio);
                this.p_setHeightActual(this.p_heightTarget * this.p_scaleHeight);
              }

              //----- set Width, if it hasn't been set already
              if (!this.p_bWidthSet || !this.isScaleChildren) this.p_setWidth(value);

              this.p_setScaleWidth(value / this.p_widthTarget);
              this.p_setWidthActual(value);

              this.invalidate();
              this.p_doPropertyChanged('widthActual', value);
              this.resized.dispatch(new ControlEventArgs(this));
            } 
            catch (e)
            {
              console.log('Error setting WidthActual: ' + e);
            }
        }
        p_widthActual: number = 100.0;
        p_setWidthActual(value: number): void
        {
            try
            {
              if (value < 0.5) value = 0.5;
              this.p_widthActual = value;
              this.p_leftActual = this.p_x - (this.p_widthActual * this.p_ptAnchor.x);
            } 
            catch (e)
            {
              console.log('Error setting WidthActual: ' + e);
            }
        }


        //----- height
        //----- The ideal height for the Root ctl
        /**
        * Gets or sets the targeted height for the control, independent of scale.
        */
        get height(): number { return this.p_heightTarget; }
        set height(value: number)
        {
            try
            {
              this.setHeightWithoutInvalidation(value);

              this.invalidate();
              this.p_doPropertyChanged('height', value);
              this.resized.dispatch(new ControlEventArgs(this));
            } 
            catch (e)
            {
              console.log('Error setting Height: ' + e);
            }
        }
        get isHeightSet(): boolean { return this.p_bHeightSet; }
        p_bHeightSet: boolean = false;
        p_heightTarget: number = 100.0;
        /**
        * Sets the height without invalidating the control.
        */
        setHeightWithoutInvalidation(value: number): void
        {
            try
            {
              if (this.isAspectRatioMaintained)
              {
                var ratio: number = 0.0;
                if (this.p_heightTarget != 0.0) ratio = value / this.p_heightTarget;
                this.p_setWidth(this.p_widthTarget * ratio);
                this.p_setWidthActual(this.p_widthTarget * this.p_scaleWidth);
              }

              this.p_setHeight(value);
              this.p_setHeightActual(value * this.p_scaleHeight); 
            } 
            catch (e)
            {
              console.log('Error setting Height: ' + e);
            }
        }
        p_setHeight(value: number): void
        {
            try
            {
              if (value < 0.5) value = 0.5;

              //---- first capture the y position
              var yTemp: number = this.p_top + (this.p_ptAnchor.y * this.p_heightTarget);
              //----- then change the width
              this.p_heightTarget = value;
              //----- now change the top based on the y position
              this.setTopWithoutInvalidation(yTemp - (this.p_ptAnchor.y * this.p_heightTarget));

              this.p_bHeightSet = true;
            } 
            catch (e)
            {
              console.log('Error setting Height: ' + e);
            }
        }


        //----- heightActual
        /**
        * Gets or sets the actual height of the control relative to it's parent, taking scale into account.
        */
        get heightActual(): number { return this.p_heightActual; }
        set heightActual(value: number)
        {
            try
            {
              if (this.isAspectRatioMaintained)
              {
                var ratio: number = 0.0;
                if (this.p_heightActual != 0.0) ratio = value / this.p_heightActual;
                this.p_setScaleWidth(this.p_scaleWidth * ratio);
                this.p_setWidthActual(this.p_widthTarget * this.p_scaleWidth);
              }

              //----- set Height, if it hasn't been set already
              if (!this.p_bHeightSet || !this.isScaleChildren) this.p_setHeight(value);

              this.p_setScaleHeight(value / this.p_heightTarget);
              this.p_setHeightActual(value);

              this.invalidate();
              this.p_doPropertyChanged('heightActual', value);
              this.resized.dispatch(new ControlEventArgs(this));
            } 
            catch (e)
            {
              console.log('Error setting HeightActual: ' + e);
            }
        }
        p_setHeightActual(value: number): void
        {
            try
            {
              if (value < 0.5) value = 0.5;
              this.p_heightActual = value;
              this.p_topActual = this.p_y - (this.p_heightActual * this.p_ptAnchor.y);
            } 
            catch (e)
            {
              console.log('Error setting HeightActual: ' + e);
            }
        }
        p_heightActual: number = 100.0;


        //----- scale
        get scale(): number { return this.p_scaleWidth; }
        set scale(value: number)
        {
            var bAspectRatioMaintained: boolean = this.isAspectRatioMaintained;
            this.isAspectRatioMaintained = true;
            this.scaleWidth = value;
            this.isAspectRatioMaintained = bAspectRatioMaintained;
            this.p_doPropertyChanged('scale', value);
            this.resized.dispatch(new ControlEventArgs(this));
        }


        //----- scaleWidth
        get scaleWidth(): number { return this.p_scaleWidth; }
        p_scaleWidth: number = 1.0;
        set scaleWidth(value: number)
        {
            this.setScaleWidthWithoutInvalidation(value);

            this.invalidate();
            this.p_doPropertyChanged('scaleWidth', value);
            this.resized.dispatch(new ControlEventArgs(this));
        }
        p_setScaleWidth(value: number): void
        {
            try
            {
              this.p_scaleWidth = value;

              if (this.p_parent != null) this.p_scaleWidthAbs = this.p_parent.scaleWidthAbs * this.p_scaleWidth;
              else this.p_scaleWidthAbs = this.p_scaleWidth;

              if (this.isScaleChildren) this.controls.updateScaleWidthAbsAll();
            } 
            catch (e)
            {
              console.log('Error setting Width: ' + e);
            }
        }
        //----- scaleWidthAbs
        get scaleWidthAbs(): number { return this.p_scaleWidthAbs; }
        p_scaleWidthAbs: number = 1.0;
        setScaleWidthWithoutInvalidation(value: number): void
        {
            if (this.isAspectRatioMaintained)
            {
              var ratio: number = 0.0;
              if (this.p_scaleWidth != 0) ratio = value / this.p_scaleWidth;
              this.p_setScaleHeight(this.p_scaleHeight * ratio);
              this.p_setHeightActual(this.p_heightTarget * this.p_scaleHeight);
            }

            this.p_setScaleWidth(value);
            this.p_setWidthActual(this.p_widthTarget * value);
        }


        //----- scaleHeight
        get scaleHeight(): number { return this.p_scaleHeight; }
        p_scaleHeight: number = 1.0;
        set scaleHeight(value: number)
        {
            this.setScaleHeightWithoutInvalidation(value);

            this.invalidate();
            this.p_doPropertyChanged('scaleHeight', value);
            this.resized.dispatch(new ControlEventArgs(this));
        }
        p_setScaleHeight(value: number): void
        {
            try
            {
              this.p_scaleHeight = value;
              if (this.p_parent != null) this.p_scaleHeightAbs = this.p_parent.scaleHeightAbs * this.p_scaleHeight;
              else this.p_scaleHeightAbs = this.p_scaleHeight;

              if (this.isScaleChildren) this.controls.updateScaleHeightAbsAll();
            } 
            catch (e)
            {
              console.log('Error setting Width: ' + e);
            }
        }
        //----- scaleHeightAbs
        get scaleHeightAbs(): number { return this.p_scaleHeightAbs; }
        p_scaleHeightAbs: number = 1.0;
        setScaleHeightWithoutInvalidation(value: number): void
        {
            if (this.isAspectRatioMaintained)
            {
              var ratio: number = 0.0;
              if (this.p_scaleHeight != 0) ratio = value / this.p_scaleHeight;
              this.p_setScaleWidth(this.p_scaleWidth * ratio);
              this.p_setWidthActual(this.p_widthTarget * this.p_scaleWidth);
            }

            this.p_setScaleHeight(value);
            this.p_setHeightActual(this.p_heightTarget * value);
        }


        //----- anchorPoint
        /**
        * This is the point around which the Control rotates and from which it 
        * grows or shrinks when scaled. It can be modified at runtime.
        * Each dimension of the point should be specified as a decimal, where (0.0, 0.0, 0,0) is equal
        * to the the upper-left corner of the control and (1.0, 1.0, 0.0) is equal to the bottom-right.
        */
        get anchorPoint(): Point { return this.p_ptAnchor; }
        set anchorPoint(value: Point)
        { 
            this.p_ptAnchor.x = value.x;
            this.p_ptAnchor.y = value.y;
            this.p_ptAnchor.z = value.z;

            this.p_handleAnchorPointChanged(new PropertyChangedEventArgs<List<number>>('data', this.p_ptAnchor.dataCopy));
        }
        p_ptAnchor: Point = new Point(0.0, 0.0, 0.0);
        p_handleAnchorPointChanged(args: PropertyChangedEventArgs<Point>): void
        {
            this.setXWithoutInvalidation(this.p_leftActual + (this.p_widthActual * this.p_ptAnchor.x));
            this.setYWithoutInvalidation(this.p_topActual + (this.p_heightActual * this.p_ptAnchor.y));

            this.p_doPropertyChanged('anchorPoint', this.p_ptAnchor);

            this.invalidate();
        }


        /**
        * Applies scaling to a location along the X axis.
        * @param {number} [x] A location on the X axis, relative to the left of the Control.
        * @return {number} The transformed location on the X axis, relative to the left of the Control.
        */
        getXTransformed(x: number): number
        {
            var scaleWidth: number = this.p_scaleWidthAbs;
            if (this.p_root != null) scaleWidth = this.p_scaleWidth;
            var fTmp: number = x * scaleWidth;
            return (fTmp);
        }


        /**
        * The output width of the Control as it actually appears on the screen in 'client' space.
        */
        get widthAbs(): number
        {
            var widthAbs: number = this.width * this.scaleWidthAbs;
            return widthAbs;
        }


        /**
        * Applies scaling to a location along the Y axis.
        * @param {number} [y] A location on the Y axis, relative to the left of the Control.
        * @return {number} The transformed location on the Y axis, relative to the top of the Control.
        */
        getYTransformed(y: number): number
        {
            var scaleHeight: number = this.p_scaleHeightAbs;
            if (this.p_root != null) scaleHeight = this.p_scaleHeight;
            var fTmp: number = y * scaleHeight;
            return (fTmp);
        }


        /**
        * Applies scaling to a location along the Z axis.
        * @param {number} [z] A location on the Z axis, relative to the left of the Control.
        * @return {number} The transformed location on the Z axis, relative to the Z of the Control.
        */
        getZTransformed(z: number): number
        {
            var scaleWidth: number = this.p_scaleWidthAbs;
            if (this.p_root != null) scaleWidth = this.p_scaleWidth;
            var fTmp: number = z * scaleWidth;
            return (fTmp);
        }


        /**
        * The absolute height of the Control as it actually appears on the screen, in 'client' space.
        */
        get heightAbs(): number
        {
            var heightAbs: number = this.height * this.scaleHeightAbs;
            return heightAbs;
        }


        //----- IsAspectRatioMaintained
        get isAspectRatioMaintained(): boolean { return this.p_isAspectRatioMaintained; }
        set isAspectRatioMaintained(value: boolean)
        {
            this.p_isAspectRatioMaintained = value;
            this.p_doPropertyChanged('isAspectRatioMaintained', value);
        }
        p_isAspectRatioMaintained: boolean = false;


        //----- IsScaleChildren
        isScaleChildren: boolean = true;


        /*--------------------------------------------------------------------*
        END: ControlBounds maintenance
        *--------------------------------------------------------------------*/


        /*--------------------------------------------------------------------*
        3D settings
        *--------------------------------------------------------------------*/
        isAcceptLighting: boolean = true;
        isAcceptShadows: boolean = false;
        isCastShadows: boolean = true;
        shadowFactor: number = 0.65;


        /*====================================================================*
        START: Events
        *====================================================================*/
        //----- loaded
        get isLoaded(): boolean { return this.p_bLoaded; }
        p_bLoaded: boolean = true;
        loaded: Signal<ControlEventArgs> = new Signal<ControlEventArgs>();
        //----- Allow the surface to alert us when it has loaded the native content.
        doLoaded(): void
        {
            this.p_bLoaded = true;
            this.loaded.dispatch(new ControlEventArgs(this));
        }


        //----- propertyChanged
        propertyChanged: Signal<PropertyChangedEventArgs> = new Signal<PropertyChangedEventArgs>();
        p_doPropertyChanged(sPropertyName: string, value: Object): void
        {
            propertyChanged.dispatch(new PropertyChangedEventArgs<Object>(sPropertyName, value));
        }


        //----- initialized
        initialized: Signal<ControlEventArgs> = new Signal<ControlEventArgs>();

        p_onInitialize(args: ControlEventArgs): void {}
        p_control_onInitialize(args: ControlEventArgs): void
        {
            try
            {
                this.z = this.p_z;
                this.p_onInitialize(args);
                this.p_bInitialized = true;
            } 
            catch (e)
            {
                console.log('Error initializing control: ' + e);
            }
        }
        //----- Fire event from an external class.
        doInitialized(): void
        {
            this.initialized.dispatch(new ControlEventArgs(this));
        }


        //----- ticked
        tick(): boolean
        {
            if (this.p_animate.timerCounter == null) return false;

            this.p_animate.tick();

            this.p_onTick();
            this.controls.tickAll();

            return true;
        }
        p_onTick(): void {}


        //----- resized
        resized: Signal<ControlEventArgs> = new Signal<ControlEventArgs>();

        p_onResized(args: ControlEventArgs): void { }
        p_control_onResized(args: ControlEventArgs): void
        {
            try
            {
              this.p_bResized = true;
            } 
            catch (e)
            {
              console.log('The Control must be added to Root before properties can be modified: ' + e);
            }

            this.p_onResized(args);
        } 
        /// Force a resize event.
        doResized(args: ControlEventArgs): void { this.resized.dispatch(args); }


        /**
        * Transforms a point from the parent control's coordinate system into the local coordinate system of this control.
        * @param {Point} [pt] A point relative to the upper-left of the parent Control</param>
        * @return {Point} The transformed point relative to the upper-left corner of this Control, with scaling, rotation and taken into account.
        */
        parentToLocal(pt: Point): Point
        {
            var ptTmp: Point = new Point(pt.x - this.x, pt.y - this.y, 0);

            //----- Rotation and scaling
            if (this.p_rotation != 0 || this.p_scaleWidth != 1.0 || this.p_scaleHeight != 1.0)
            {
                var csTmp: CoordSy = new CoordSys(0, 0, 0);
                var ptCS: Point = csTmp.getPointFromScreenPoint(ptTmp);

                //----- Account for rotation by rotating the point around the anchor point in the opposite direction
                //----- of the rotation applied to the control.
                if (this.p_rotation != 0) ptCS.rotateZ(this.rotation);

                //----- Account for scaling by applying scaling to the point in reverse of that applied to the control.
                if (this.p_scaleWidth != 1.0 || this.p_scaleHeight != 1.0)
                {
                    var scaleWidth: number = this.p_scaleWidth;
                    var scaleHeight: number = this.p_scaleHeight;

                    //----- Don't divide by zero.
                    if (scaleWidth == 0) scaleWidth = 0.0001;
                    if (scaleHeight == 0) scaleHeight = 0.0001;

                    ptCS.x /= scaleWidth;
                    ptCS.y /= scaleHeight;
                }

                ptTmp = ptCS.out(); 
            }

            ptTmp.x += this.width * this.anchorPoint.x;
            ptTmp.y += this.height * this.anchorPoint.y;

            return ptTmp;
        }


        /**
        * Transforms a point from the local coordinate system of this control into the parent control's coordinate system.
        * @param {Point} [pt] A point relative to the upper-left of this Control</param>
        * @return {Point} The transformed point relative to the upper-left corner of the parent Control, with scaling and rotation taken into account.
        */
        localToParent(pt: Point): Point
        {
            if (this.p_parent == null) return pt;

            var ptTmp: Point = pt;

            //----- Rotation and scaling
            if (this.p_rotation != 0 || this.p_scaleWidth != 1.0 || this.p_scaleHeight != 1.0)
            {
                //----- Set up a local coordinate system at the target size of this control, with the anchorpoint of the control as the (0,0) point.
                var csTmp: CoordSys = new CoordSys.fromPoint(new Point(this.width * this.anchorPoint.x, this.height * this.anchorPoint.y, this.anchorPoint.z));
                var ptCS: Point = csTmp.getPointFromScreenPoint(ptTmp);

                //----- Account for rotation by rotating the point around the anchor point in the direction
                //----- of the rotation applied to the control.
                if (this.p_rotation != 0) ptCS.rotateZ(-this.rotation);
                if (this.p_rotationX != 0) ptCS.rotateX(-this.rotationX);
                if (this.p_rotationY != 0) ptCS.rotateY(-this.rotationY);

                //----- Account for scaling by applying scaling to the point, the same as that applied to the control.
                if (this.p_scaleWidth != 1.0 || this.p_scaleHeight != 1.0)
                {
                    var scaleWidth: number = this.p_scaleWidth;
                    var scaleHeight: number = this.p_scaleHeight;

                    //----- Don't divide by zero.
                    if (scaleWidth == 0) scaleWidth = 0.0001;
                    if (scaleHeight == 0) scaleHeight = 0.0001;

                    ptCS.x *= scaleWidth;
                    ptCS.y *= scaleHeight;
                    ptCS.z *= scaleWidth;
                }

                ptTmp = ptCS.out();
            }

            ptTmp = new Point(ptTmp.x + this.leftActual, ptTmp.y + this.topActual, ptTmp.z + this.zActual);

            return ptTmp;
        }


        /*
        * Transforms a point from the local coordinate system of this control into the coordinate system of the Root.
        * @param {Point} [pt] A point relative to the upper-left of this Control</param>
        * @return {Point} The transformed point relative to the upper-left corner of the parent Root, with scaling and rotation taken into account.
        */
        localToRoot(pt: Point): Point
        {
            var ptTmp: Point = pt;

            var ctl: Control = this;

            while (ctl.parent != null)
            {
              ptTmp = ctl.localToParent(ptTmp);
              ctl = ctl.parent;
            }

            return ptTmp;
        }


        /**
        * Move this control to the top of the z-order stack, so it renders on top of other controls in its parent control.
        */
        moveToTop(): boolean
        {
            if (this.p_parent != null) 
            {
                var parent: Control = this.p_parent;
              //----- TODO: This is causing some problems with drag deceleration on Zoomable.
              if (parent.controls.remove(this)) parent.controls.add(this);
              return true;
            }

            return false;
        }


        /**
        * Checks to see whether any of the children of this control can receive a mouse event at the specified point.
        * @param {Point} [ptLocal] A point relative to this control's upper-left corner.
        * @return {ControlBase} The control that received the hit, or null if no suitable controls were found.
        */
        checkMouseEventInChildren(ptRoot: Point, ptLocal: Point): ControlBase
        {
            var ctl: Control = null;

            for (var i: number = this.controls.length - 1; i >= 0; i--)
            {
                var ctlTmp: Control = this.controls[i];

                if (!ctlTmp.isVisible || ctlTmp.opacityAbs <= ctlTmp.opacityMin) continue;

                var ptCtlTmpLocal: Point = ctlTmp.parentToLocal(ptLocal);
                var bPointInControl: boolean = this.hitTest(ptRoot, ptCtlTmpLocal);

                if (!ctlTmp.isClipChildControls || bPointInControl) //The point may have landed in one of the children of this control.
                {
                    if (ctlTmp.isAllowMouseEvents && bPointInControl)
                    { 
                        ctl = ctlTmp; //The point was in the control and the control allows mouse events, so it gets the hit.
                        break;
                    }
                    else //The point wasn't in the control, or the control doesn't allow mouse events, but maybe one of its children does.
                    {
                        var ctlTmp2: Control = ctlTmp.controls.findMouseEnabledControlAtPoint(ptRoot, ptCtlTmpLocal);
                        if (ctlTmp2 != null) //Even though this control doesn't allow mouse events, one of its child controls got the hit.
                        {
                            ctl = ctlTmp;
                            break;
                        }
                        else continue;
                    }
                }
            }

            return ctl;
        }


        //----- mouseMove
        mouseMove: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewMouseMove: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseMove(e: MouseEventArgs): void {}
        onPreviewMouseMove(e: MouseEventArgs): void {}

        /**
        * Checks to see whether a mouse event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkMouseMove(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; //The point isn't in this control.

            e.sender = this;
            this.doPreviewMouseMove(e);
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                ctl.checkMouseMove(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doMouseMove(e);
            }
        }
        //----- Fire event from an external class.
        doPreviewMouseMove(e: MouseEventArgs): void 
        {
            this.p_root.controlsPreviewMouseMove.add(this);

            if (!this.p_bPreviewMouseOver && !this.p_root.controlsPreviewMouseMoveLast.contains(this))
            { //----- We weren't in this control on the last pass, so fire a PreviewMouseEnter.
                this.doPreviewMouseEnter(e);
            }

            e.sender = this;
            this.previewMouseMove.dispatch(e);;
        }
        doMouseMove(e: MouseEventArgs): void 
        {
            e.isHandled = false;

            //----- Make sure we don't register a click on mouseup, since the mouse has been moved.
            if (this.p_bMouseLeftButtonDown)
            {
              if (Math.abs(this.p_ptMouseDown.x - e.positionRoot.x) > this.p_clickThreshold 
                  || Math.abs(this.p_ptMouseDown.y - e.positionRoot.y) > this.p_clickThreshold) this.p_bRegisterClick = false;
            }

            this.p_root.controlsMouseMove.add(this);

            if (!this.p_bMouseOver && !this.p_root.controlsMouseMoveLast.contains(this))
            { //----- We weren't in this control on the last pass, so fire a MouseEnter.
                this.doMouseEnter(e);
                if (e.isHandled) return;
            }

            e.sender = this;
            this.mouseMove.dispatch(e);
            this.invalidate();
        }

        //----- previewMouseEnter
        previewMouseEnter: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onPreviewMouseEnter(e: MouseEventArgs): void { }
        //----- Fire event from an external class.
        doPreviewMouseEnter(e: MouseEventArgs): void
        {
            this.p_bPreviewMouseOver = true;
            this.previewMouseEnter.dispatch(e);
        }
        //----- previewMouseLeave
        previewMouseLeave: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onPreviewMouseLeave(e: MouseEventArgs): void { }
        //----- Fire event from an external class.
        doPreviewMouseLeave(e: MouseEventArgs): void
        {
            this.p_bPreviewMouseOver = false;
            this.previewMouseLeave.dispatch(e);
        }

        //----- mouseEnter
        mouseEnter: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseEnter(e: MouseEventArgs): void { }
        //----- Fire event from an external class.
        doMouseEnter(e: MouseEventArgs): void
        {
            e.isHandled = false;
            this.p_bMouseOver = true;
            this.mouseEnter.dispatch(e);
            this.invalidate(); // Invalidate, in case styles need to be updated.
        }
        //----- mouseLeave
        mouseLeave: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseLeave(e: MouseEventArgs): void { }
        //----- Fire event from an external class.
        doMouseLeave(e: MouseEventArgs): void
        {
            e.isHandled = false;
            this.p_bMouseOver = false;
            this.mouseLeave.dispatch(e);
            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        //----- mouseLeftButtonDown
        p_bRegisterClick: boolean = false;
        p_ptMouseDown: Point;
        p_clickThreshold: number = 30; // This distance the mouse may move before a click event is cancelled.
        cancelClick(): void { this.p_bRegisterClick = false; }
        mouseLeftButtonDown: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewMouseLeftButtonDown: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseLeftButtonDown(e: MouseEventArgs): void { }
        onPreviewMouseLeftButtonDown(e: MouseEventArgs): void { }
       /**
        * Checks to see whether a left mousedown event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkMouseLeftButtonDown(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; // The point isn't in this control.

            //----- Preview the event before passing it along to child controls.
            e.sender = this;
            this.previewMouseLeftButtonDown.dispatch(e);
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                ctl.checkMouseLeftButtonDown(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doMouseLeftButtonDown(e);
            }
        }
        //----- Fire event from an external class.
        doMouseLeftButtonDown(e: MouseEventArgs): void 
        {
            e.isHandled = false;
            this.p_ptMouseDown = e.positionRoot;
            this.p_bMouseLeftButtonDown = true;
            this.mouseLeftButtonDownArgs = e;
            if (this.p_root != null) this.p_root.p_ctlMouseLeftButtonDown = this;
            this.mouseLeftButtonDown.dispatch(e);;
            this.p_bRegisterClick = true;

            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        //----- MouseLeftButtonUp
        mouseLeftButtonUp: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewMouseLeftButtonUp: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseLeftButtonUp(e: MouseEventArgs): void { }
        onPreviewMouseLeftButtonUp(e: MouseEventArgs): void { }
        /**
        * Checks to see whether a left mouseup event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkMouseLeftButtonUp(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; // The point isn't in this control.

            //----- Preview the event before passing it along to child controls.
            e.sender = this;
            this.previewMouseLeftButtonUp.dispatch(e);
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                ctl.checkMouseLeftButtonUp(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doMouseLeftButtonUp(e);   
            }
        }
        //----- Fire event from an external class.
        doMouseLeftButtonUp(e: MouseEventArgs): void
        {
            e.isHandled = false;

            //----- Register a mouseup before changing p_mshellRoot.ControlMouseLeftButtonDown,
            //----- so OnMouseLeftButtonUp can check p_mshellRoot.ControlMouseLeftButtonDown.
            this.mouseLeftButtonUp.dispatch(e);
            if (this.p_bMouseLeftButtonDown && this.p_bRegisterClick) 
            {
                //----- _bRegisterClick will be false if the mouse moved since the original mousedown.
                this.mouseClick.dispatch(e); // Register a click, as well as a mouseup.
            }
            this.p_bRegisterClick = false;

            if (this.p_root != null && this.p_root.controlMouseLeftButtonDown != null)
            {
                (<Control>this.p_root.controlMouseLeftButtonDown).p_bMouseLeftButtonDown = false;
            }

            if (this.p_root != null) this.p_root.p_ctlMouseLeftButtonDown = null;

            this.p_bMouseLeftButtonDown = false;

            this.invalidate(); // Invalidate, in case styles need to be updated.
        }
        //----- MouseClick
        mouseClick: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseClick(e: MouseEventArgs): void { }
        //----- Fire event from an external class.
        doMouseClick(e: MouseEventArgs): void
        {
            e.isHandled = false;
            this.mouseClick.dispatch(e);;
            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        //----- mouseRightButtonDown
        mouseRightButtonDown: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewMouseRightButtonDown: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseRightButtonDown(e: MouseEventArgs): void { }
        onPreviewMouseRightButtonDown(e: MouseEventArgs): void { }
        /**
        * Checks to see whether a right mousedown event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkMouseRightButtonDown(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; // The point isn't in this control.

            //----- Preview the event before passing it along to child controls.
            e.sender = this;
            this.previewMouseRightButtonDown.dispatch(e);
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                ctl.checkMouseRightButtonDown(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doMouseRightButtonDown(e);
            }
        }
        //----- Fire event from an external class.
        doMouseRightButtonDown(e: MouseEventArgs): void 
        {
            e.isHandled = false;
            this.p_bMouseRightButtonDown = true;
            this.mouseRightButtonDownArgs = e;
            this.p_root.p_ctlMouseRightButtonDown = this;
            this.mouseRightButtonDown.dispatch(e);;

            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        //----- MouseRightButtonUp
        mouseRightButtonUp: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewMouseRightButtonUp: Signal<MouseEventArgs> = new Signal<MouseEventArgs>(); 
        onMouseRightButtonUp(e: MouseEventArgs): void { }
        onPreviewMouseRightButtonUp(e: MouseEventArgs): void { }
        /**
        * Checks to see whether a right mouseup event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkMouseRightButtonUp(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; // The point isn't in this control.

            //----- Preview the event before passing it along to child controls.
            e.sender = this;
            this.previewMouseRightButtonUp.dispatch(e);;
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                ctl.checkMouseRightButtonUp(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doMouseRightButtonUp(e);   
            }
        }
        //----- Fire event from an external class.
        doMouseRightButtonUp(e: MouseEventArgs): void
        {
            e.isHandled = false;

            //----- Register a mouseup before changing p_mshellRoot.ControlMouseLeftButtonDown,
            //----- so OnMouseLeftButtonUp can check p_mshellRoot.ControlMouseLeftButtonDown.
            this.mouseRightButtonUp.dispatch(e);;

            if (this.p_root.controlMouseRightButtonDown != null)
            {
                (<Control>this.p_root.controlMouseRightButtonDown).p_bMouseRightButtonDown = false;
            }

            this.p_root.p_ctlMouseRightButtonDown = null;

            this.p_bMouseRightButtonDown = false;

            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        //----- mouseWheel
        mouseWheel: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewMouseWheel: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onMouseWheel(e: MouseEventArgs): void { }
        onPreviewMouseWheel(e: MouseEventArgs): void { }
        /**
        * Checks to see whether a mouse wheel event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkMouseWheel(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; // The point isn't in this control.

            //----- Preview the event before passing it along to child controls.
            e.sender = this;
            this.previewMouseWheel.dispatch(e);;
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                ctl.checkMouseWheel(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doMouseWheel(e);
            }
        }
        //----- Fire event from an external class.
        doMouseWheel(e: MouseEventArgs): void
        {
            e.isHandled = false;
            this.mouseWheel.dispatch(e);;
            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        /*--------------------------------------------------------------------*
        Drag and Drop Events
        *--------------------------------------------------------------------*/
        //----- dragOver
        dragOver: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewDragOver: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onDragOver(e: MouseEventArgs): void { }
        onPreviewDragOver(e: MouseEventArgs): void { }
        /**
        * Checks to see whether a dragover mouse event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkDragOver(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; // The point isn't in this control.

            //----- Preview the event before passing it along to child controls.
            e.sender = this;
            this.previewDragOver.dispatch(e);;
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                eNew.dragAttributes = e.dragAttributes;
                ctl.checkDragOver(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doDragOver(e);
            }
        }
        //----- Fire event from an external class.
        doDragOver(e: MouseEventArgs): void
        {
            e.isHandled = false;
            this.dragOver.dispatch(e);;
            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        //----- dragDrop
        dragDrop: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        previewDragDrop: Signal<MouseEventArgs> = new Signal<MouseEventArgs>();
        onDragDrop(e: MouseEventArgs): void { }
        onPreviewDragDrop(e: MouseEventArgs): void { }
        /**
        * Checks to see whether a dragdrop mouse event occured in this control, or one of its children.
        * @param {MouseEventArgs} [e] Contains X and Y values for the mouse event in local coordinates, relative to the upper-left of this control.
        */
        checkDragDrop(e: MouseEventArgs): void
        {
            if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
            if (e.isHandled) return;

            if (this.isClipChildControls && !this.hitTest(e.positionRoot, e.positionLocal)) return; // The point isn't in this control.

            //----- Preview the event before passing it along to child controls.
            e.sender = this;
            this.previewDragDrop.dispatch(e);;
            if (e.isHandled) return;

            var bHandled: boolean = true;

            var ctl: Control = this.checkMouseEventInChildren(e.positionRoot, e.positionLocal);

            if (ctl != null) // One of the child controls got the hit.
            {
                var ptCtlLocal: Point = ctl.parentToLocal(e.positionLocal);
                var eNew: MouseEventArgs = new MouseEventArgs(ctl, e.buttons, e.clickCount, e.positionRoot, ptCtlLocal, e.wheelDelta);
                eNew.dragAttributes = e.dragAttributes;
                ctl.checkDragDrop(eNew);

                bHandled = eNew.isHandled;
                e.isHandled = bHandled;
            }
            else // The hit must have been in this control.
            {
                bHandled = false;
            }

            if (!bHandled && this.isAllowMouseEvents) 
            {
                e.sender = this;
                this.doDragDrop(e);
            }
        }
        //----- Fire event from an external class.
        doDragDrop(e: MouseEventArgs): void
        {
            e.isHandled = false;
            this.dragDrop.dispatch(e);;
            this.invalidate(); // Invalidate, in case styles need to be updated.
        }


        /*====================================================================*
          START: Methods
         *====================================================================*/
        invalidate(): void
        {
            if (this.p_root == null) return;

            //----- Make sure the Parent isn't already invalidated before setting this.Parent.GetControlRegions.
            //----- Since the Root is ticked from the top down (parents first, then their ctls), Parents will always invalidate
            //----- before their ctls. If our Parent is already invalidated, we know that GetControlRegions has already been set
            //----- somewhere above us.
            if (this.isInitialized)
            {
                //----- If this is a flat, double-buffered graphics system (as opposed to a nested surface system). 
                //----- we need to make sure all sibling controls are re-drawn before rendering.
                if (this.p_root != null && this.p_root.renderer != null && !this.p_root.renderer.isNestedSurfaceSystem)
                {
                    if (this.p_parent == null) this.invalidateAll();
                    else this.p_parent.invalidateAll(); // Mark all sibling controls as invalidated.
                } 
                else
                {
                    this.p_bInvalidated = true;
                }

                //----- If we're not rendering on a timer, we need to render whenever the control is invalidated,
                //----- otherwise, we render every tick.
                if (!this.p_root.isRenderedOnTimer)
                {
                    this.render();
                }
            }
        }


        invalidateAll(): void
        {
            if (!p_bInvalidated)
            {
                this.p_bInvalidated = true;
                this.controls.invalidateAll();
            }
        }


        /*--------------------------------------------------------------------*
        START: Methods for updating a Control chain that has been added to the ControlSystem
        *--------------------------------------------------------------------*/
        setScaleWidthAbs(): void
        {
            var fScaleTmp: number = this.scaleWidth;
            var ctl: IControl = this;

            while (ctl.parent != null)
            {
                ctl = ctl.parent;
                if (ctl.isScaleChildren) fScaleTmp *= ctl.scaleWidth;
            }

            this.p_scaleWidthAbs = fScaleTmp;
        }


        setScaleHeightAbs(): void
        {
            var fScaleTmp: number = this.scaleHeight;
            var ctl: IControl = this;

            while (ctl.parent != null)
            {
                ctl = ctl.parent;
                if (ctl.isScaleChildren) fScaleTmp *= ctl.scaleHeight;
            }

            this.p_scaleHeightAbs = fScaleTmp;
        }

        get isAttachedToControlSystem(): boolean { return _bAttachedToControlSystem; }
        _bAttachedToControlSystem: boolean = false;
        p_onAttachedToControlSystem(): void {}
        attachedToControlSystem: Signal<ControlEventArgs> = new Signal<ControlEventArgs>();
        _control_onAttachedToControlSystem(): void
        {
            try
            {
                if (this.p_parent == null) return;

                this.p_root = this.p_parent.root;
                this.p_opacityAbs = (this.p_parent.opacityAbs * this.opacity);

                this.setScaleWidthAbs();
                this.setScaleHeightAbs();
                if (this.isScaleChildren)
                {
                    this.controls.updateScaleWidthAbsAll();
                    this.controls.updateScaleHeightAbsAll();
                }

                if (this.p_parent.surface != null) this.p_parent.surface.addChild(this.surface);

                this.p_colControls.p_onAttachedToControlSystemAll();

                this._bAttachedToControlSystem = true;
                this.attachedToControlSystem.dispatch(new ControlEventArgs(this));
                this.p_onAttachedToControlSystem();
            } 
            catch (e)
            {
                console.log('Exception in Control.p_control_onAttachedToControlSystem: ' + e);
            }
        }


        p_onRemovedFromControlSystem(): void { }
        removedFromControlSystem: Signal<ControlEventArgs> = new Signal<ControlEventArgs>();
        _control_onRemovedFromControlSystem(): void
        {
            try
            {
                this.p_root = null;
                this.p_colControls.p_onRemovedFromControlSystemAll();
                this._bAttachedToControlSystem = false;
                this.removedFromControlSystem.dispatch(new ControlEventArgs(this));
                this.p_onRemovedFromControlSystem();
                if (this.p_parent.surface != null) p_parent.surface.removeChild(this.surface);
            } 
            catch (e)
            {
                console.log('Error removing control from control system: ' + e);
            }
        }
        /*--------------------------------------------------------------------*
        END: Methods for updating a Control chain that has been added to the ControlSystem
        *--------------------------------------------------------------------*/


        render(): void
        {
            try
            {
                if (this.isDisposed) return;
                if (this.p_root == null || this.p_root.renderer == null) return;
                if (!this.isVisible || this.opacityAbs <= this.opacityMin) return;
                if (this.isInitialized)
                {
                    p_onRender();
                    this.controls.renderAll();  

                    this.p_bInvalidated = false;
                    this.p_bResized = false;
                }
            } 
            catch (e)
            {
                console.log('Error in Control.render(): ' + e.toString());
            }
        }
        p_onRender(): void {}


        /*--------------------------------------------------------------------*
        START: Animation Methods
        *--------------------------------------------------------------------*/
        /*--------------------------------------------------------------------*
        USAGE
        *--------------------------------------------------------------------*
        this.p_root.animate.doThis(btn1.moveBy(100, 100, 1, Linear.easIn).And(
          btn1.rotateBy(-100, 1).then(btn1.rotateBy(100, 1))
        ).and(
          btn1.fadeTo(100, 1)
        ).then(
          btn1.mveBy(-100, -100, 1).and(btn1.fadeTo(50, 1)).then(btn1.pause(2, this.p_animPausep_onDone))
        );
        *--------------------------------------------------------------------*/
        //----- moveTo
        moveTo(targetX: number, targetY: number, targetZ: number, duration: number, 
            ease: Function = AnimEase.getEasing(AnimEaseCategory.CUBIC, AnimEaseType.INOUT), 
            doneHandler: Function = null): AnimWrapper
        {
            var anim: AAnim = new AnimMoveTo(this, targetX, targetY, targetZ, duration, ease);
            if (doneHandler != null) anim.done.listen(doneHandler);
            return new AnimWrapper(anim);
        }


        //----- moveBy
        moveBy(offsetX: number, offsetY: number, offsetZ: number, duration: number, 
            ease: Function = AnimEase.getEasing(AnimEaseCategory.CUBIC, AnimEaseType.INOUT), doneHandler: Function = null): AnimWrapper
        {
            var anim: AAnim = new AnimMoveBy(this, offsetX, offsetY, offsetZ, duration, ease);
            if (doneHandler != null) anim.done.listen(doneHandler);
            return new AnimWrapper(anim);
        }


        //----- rotateBy
        rotateBy(offsetX: number, offsetY: number, offsetZ: number, duration: number, 
            ease: Function = AnimEase.getEasing(AnimEaseCategory.CUBIC, AnimEaseType.INOUT), 
            doneHandler: Function = null): AnimWrapper
        {
            var anim: AAnim = new AnimRotateBy(this, offsetX, offsetY, offsetZ, duration, ease);
            if (doneHandler != null) anim.done.listen(doneHandler);
            return new AnimWrapper(anim);
        }


        //----- rotateTo
        rotateTo(rotationX: number, rotationY: number, rotationZ: number, duration: number, 
            ease: Function = AnimEase.getEasing(AnimEaseCategory.CUBIC, AnimEaseType.INOUT), 
            doneHandler: Function = null): AnimWrapper
        {
            var anim: AAnim = new AnimRotateTo(this, rotationX, rotationY, rotationZ, duration, ease);
            if (doneHandler != null) anim.done.listen(doneHandler);
            return new AnimWrapper(anim);
        }


        //----- fadeTo
        fadeTo(opacityTarget: number, duration: number, 
            ease: Function = AnimEase.getEasing(AnimEaseCategory.CUBIC, AnimEaseType.INOUT), 
            doneHandler: Function = null): AnimWrapper
        {
            var anim: AAnim = new AnimFadeTo(this, opacityTarget, duration, ease);
            if (doneHandler != null) anim.done.listen(doneHandler);
            return new AnimWrapper(anim);
        }


        //----- pause
        pause(duration: number, doneHandler: Function = null): AnimWrapper
        {
            var anim: AAnim = new AnimPause(duration);
            if (doneHandler != null) anim.done.listen(doneHandler);
            return new AnimWrapper(anim);
        }


        //----- sizeTo
        sizeTo(targetX: number, targetY: number, duration: number, bScaleChildren: boolean = true, 
            ease: Function = AnimEase.getEasing(AnimEaseCategory.CUBIC, AnimEaseType.INOUT), 
            doneHandler: Function = null): AnimWrapper
        {
            var anim: AAnim = new AnimSizeTo(this, targetX, targetY, duration, bScaleChildren, ease);
            if (doneHandler != null) anim.done.listen(doneHandler);
            return new AnimWrapper(anim);
        }


        /*--------------------------------------------------------------------*
        START: IDisposable
        *--------------------------------------------------------------------*/
        get isDisposed(): boolean { return this.p_bDisposed; }
        p_bDisposed: boolean = false;

        dispose(): void
        {
            if (this.p_bDisposed) return;

            this.p_bDisposed = true;

            this.p_disposingEvent.signal(new DisposedEventArgs<Control>(this));

            onDisposing();
        }

        disposing: Signal<DisposedEventArgs<Control>> = new Signal<DisposedEventArgs<Control>>();

        onDisposing(): void {}
    } // End of class
} // End of module