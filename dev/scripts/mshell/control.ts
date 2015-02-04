
/// <reference path='iControl.ts' />
/// <reference path='controlBase.ts' />


module mshell
{
    export class Control extends ControlBase
    {
        /*====================================================================*
          START: Constructor
        *====================================================================*/
        constructor(element: Element = null)
        {
            super();
            
            if (element != null) this.p_elem = element;

            //----- Don"t allow this element to be selected
            this.p_elem.style.userSelect = 'none';
            this.p_elem.style.userSelect = "none";
            this.p_elem.style.webkitUserSelect = "none";
            this.p_elem.style.MozUserSelect = "none";
            this.p_elem.setAttribute("unselectable", "on"); // For IE and Opera
            this.p_elem.style.webkitUserDrag = 'none';

            //----- Set up 3d stuff.
            //----- Be careful about changing anything here. 
            //----- 'overflow: hidden' and 'clip' don"t work with preserve-3d (they make everything flat).
            this.p_elem.style.position = 'absolute';
            this.p_elem.style.display = 'block';
            this.p_elem.style.transformStyle = 'preserve-3d';
            
            this.animate.timerCounter = new HiResTimerCounterBrowser();

            this.p_elem.onMouseOver.listen(_elem_onMouseOver);
            this.p_elem.onMouseOut.listen(_elem_onMouseOut);
        }


        /*====================================================================*
          START: Properties and fields
         *====================================================================*/
        p_bHit: boolean = false;

        get element(): HTMLElement { return p_elem; }
        p_elem: HTMLElement = document.createElement('div');
        
        
        /*====================================================================*
          START: Public methods
         *====================================================================*/
        hitTest(ptLocal: Point = null): boolean
        {
            if (this.p_root.is3dEnabled) return this.p_bHit;
            else
            {
                if (ptLocal.x < 0) return false;
                if (ptLocal.x > this.width) return false;
                if (ptLocal.y < 0) return false;
                if (ptLocal.y > this.height) return false;
            }

            return true;
        }


        /*====================================================================*
          START: Protected methods
         *====================================================================*/
        void p_onRender()
        {
            if (!this.p_bInvalidated) return;

            try
            {
                //----- width and height
                this.p_elem.style.width = this.width.toString() + 'px';
                this.p_elem.style.height = this.height.toString() + 'px';
            
                //------ z index
                this.p_elem.style.zIndex = this.zIndex.toString();

                //----- visibility
                this.p_elem.style.overflow = this.isClipChildControls ? 'hidden' : 'visible';

                this.p_elem.style.opacity = this.opacity.toString();

                this.p_elem.style.display = this.isVisible ? 'block' : 'none';

                if (this.control.opacity <= this.opacityMin) this.p_elem.style.display = 'none';

                //----- Tell the system we want all our transformations to use the control"s anchorPoint as the origin.
                //----- This means we"ll use x and y values of the control for positioning, rather than left and top.
                this.p_elem.style.transformOriginX = (this.anchorPoint.x * 100.0).toString() + '%';
                this.p_elem.style.transformOriginY = (this.anchorPoint.y * 100.0).toString() + '%';
                this.p_elem.style.transformOriginZ = this.anchorPoint.z.toString() + 'px'; //This has to be a length, not a percentage.

                var translateX: number = this.left;
                var translateY: number = this.top;

                if (this.p_root.is3dEnabled) 
                {
                    //----- Apparently, transform3d and rotate3d engage the graphics card, 
                    //----- so they enable better performance than using individual transformations, like transformX and rotateX.
                    this.p_elem.style.transform = ''
                        + 'translate3d(' + translateX.toString() + 'px, ' + translateY.toString() + 'px, ' + this.z.toString() + 'px) '
                        + 'scale3d(' + this.scaleWidth.toString() + ', ' + this.scaleHeight.toString() + ', 1) '
                        + 'rotate3d(1, 0, 0, ' + this.rotationX.toString() + 'deg) '
                        + 'rotate3d(0, 1, 0, ' + this.rotationY.toString() + 'deg) '
                        + 'rotate3d(0, 0, 1, ' + this.rotationZ.toString() + 'deg)';
                }
                else
                {
                    //----- NOTE: The code below doesn"t leverage hardware acceleration, but it does seem to fix a bug with
                    //----- disappearing elements in Google Chrome
                    this.p_elem.style.transform = ''
                        + 'translateX(' + translateX.toString() + 'px)'
                        + 'translateY(' + translateY.toString() + 'px)'
                        + 'scale(' + this.scaleWidth.toString() + ', ' + this.scaleHeight.toString() + ') '
                        + 'rotate(' + this.rotationZ.toString() + 'deg)';

                    //----- NOTE: The code below invokes hardware acceleration, but causes elements to disappear unexpectedly in Chrome.
                    /*this.p_elem.style.transform = ''
                        + 'translate3d(' + translateX.toString() + 'px, ' + translateY.toString() + 'px, 0px) '
                        + 'scale3d(' + this.scaleWidth.toString() + ', ' + this.scaleHeight.toString() + ', 1) '
                        + 'rotate3d(0, 0, 1, ' + this.rotationZ.toString() + 'deg)';*/
                }

                this.p_bInvalidated = false;
            }
            catch(e)
            {
                console.log('Error in SurfaceDom.render(): ' + e.toString());
            }
        }

    
        p_addChildElement(element: Element): void
        { 
            this.p_elem.nodes.add(element);
        }


        p_removeChildElement(element: Element): void
        { 
            this.p_elem.nodes.remove(element);
        }


        /*====================================================================*
          START: Private methods
         *====================================================================*/
        private _elem_onMouseOver(html.MouseEvent e): void
        {
            this.p_bHit = true;
        }


        private _elem_onMouseOut(html.MouseEvent e): void
        {
            this.p_bHit = false;
        }
    }
}