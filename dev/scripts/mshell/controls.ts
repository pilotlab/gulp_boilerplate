
/// <reference path='collections/list.ts' />
/// <reference path='collections/dictionary.ts' />


module mshell
{
    class Controls extends List<Control>
    {
        /*====================================================================*
          START: Constructor
         *====================================================================*/
        constructor(Control control)
        {
            super();
            p_control = control;
        }


        /*====================================================================*
          START: Member Variables and Properties
         *====================================================================*/
        p_mapNames: Dictionary<string, Control> = new Dictionary<string, Control>();


        //----- parent
        get parent: Control { return this.p_control; }
        p_control: Control;
        

        //----- sortedByZ
        get sortedByZ(): List<Control> { return this.p_listSortedByZ; }
        p_listSortedByZ: List<Control> = new List<Control>();

  
        /*====================================================================*
          START: Methods
         *====================================================================*/
        elementByName(name: string): Control
        {
            try
            {
                return this.p_mapNames[name];
            }
            catch(e)
            {
                console.log('A Control with the name \'name\' cannot be found.');
                return null;
            }
        }


        replaceAt(index: number, ctl: Control): Control
        {
            if (index > this.length - 1 || index < 0) return null;
            else 
            {
                if (ctl.parent != null)
                {
                    ctl.parent.controls.remove(ctl);
                }

                this.p_listSortedByZ.removeElementAtIndex(index);
                this.p_listSortedByZ.add(ctl);

                var ctlTemp: Control = this.removeElementAtIndex(index);
                this.add(ctl, index);

                for (var i: number = index ; i < this.length; i++)
                {
                    var ctlAtIndex: Control = this.elementAtIndex(i);
                    if (ctlAtIndex.p_nZIndex != i)
                    {
                        ctlAtIndex.p_nZIndex = i;
                        ctlAtIndex.p_doPropertyChanged('zIndex', i);
                    }
                }

                ctl.p_nNestLevel = ctl.parent.nestLevel + 1;

                ctl.invalidate();

                return ctl;
            }
        }


        add(ctl: Control, index?: number): Control
        {
            try
            {
                if (index == undefined || index == null || index > this.length) index = this.length;
                if (index < 0) index = 0;

                if (ctl.name != null && ctl.name != '')
                {
                    try
                    {
                        this.p_mapNames.setValue(ctl.name, ctl);
                    }
                    catch (e)
                    {
                        console.log('An element with Key = \'name\' already exists.');
                        return ctl;
                    }
                }

                if (ctl.parent != null)
                {
                    ctl.parent.controls.remove(ctl);
                }

                ctl.p_parent = p_control;

                this.add(ctl, index);
                this.p_listSortedByZ.add(ctl, index);

                ctl.p_nNestLevel = ctl.parent.nestLevel + 1;

                ctl.doInitialized();

                for (var i: number = index ; i < this.length; i++)
                {
                    var ctlAtIndex: Control = this.elementAtIndex(i);
                    if (ctlAtIndex.p_nZIndex != i)
                    {
                        ctlAtIndex.p_nZIndex = i;
                        ctlAtIndex.p_doPropertyChanged('zIndex', i);
                    }
                }

                ctl.invalidate();

                if (this.p_control != null && this.p_control.root != null)
                {
                    ctl._control_onAttachedToControlSystem();
                }

                return ctl;
            }
            catch (e)
            {
                console.log('Error adding a ControlSystemCtrl: ' + e);
                return null;
            }
        }


        addByName(ctl: Control, name: string): Control
        {
            ctl.p_name = name;
            ctl = this.add(ctl);
            return ctl;
        }


        p_onAttachedToControlSystemAll(): void
        {
            for (var i: number = 0; i < this.length; i++)
            {
                this.getElementAtIndex(i)._control_onAttachedToControlSystem();
            }

            this.p_control.invalidate();
        }


        p_onRemovedFromControlSystemAll(): void
        {
            for (var i: number = 0; i < this.length; i++)
            {
                this.getElementAtIndex(i)._control_onRemovedFromControlSystem();
            }
        }


        bool remove(ctl: Control)
        {
            if (this.removeAt(item.zIndex) != null) return true;
            else return false;
        }


        removeElementAtIndex(index: number): Control
        {
            if (index > this.length - 1 || index < 0) return null;
            else 
            {
                var ctl: Control = this.elementAtIndex(index);

                ctl._control_onRemovedFromControlSystem();

                this.p_control.removeChild(ctl);

                ctl.p_parent = null;
                ctl.p_root = null;

                p_list.removeAt(index);
                p_listSortedByZ.remove(ctl);
                p_mapNames.remove(ctl.name);

                for (int i = index ; i < p_list.length; i++)
                {
                    if (p_list[i].p_nZIndex != i)
                    {
                        p_list[i].p_nZIndex = i;
                        p_list[i].p_doPropertyChanged('zIndex', i);
                    }
                }

                if (ctl != null) return true;
                else return false;
            }
        }


        bool removeByName(String sName)
        {
        Control ctl = null;

        try
        {
          ctl = p_mapNames[sName];
        }
        catch (e)
        {
          print('An element with the name \'sName\' cannot be found.');
          return null;
        }

        this.removeAt(ctl.zIndex);

        if (ctl != null) return true;
        else return false;
        }


        Control moveToTop(Control ctl)
        {
        if (p_list.length < 1) return null;

        if (p_control != null) 
        {
          if (p_control.controls.remove(ctl)) p_control.controls.add(ctl);
        }

        return ctl;
        }


        void clear()
        {
        for (int i = 0; i < p_list.length; i++)
        {
          Control ctl = p_list[i];
          ctl._control_onRemovedFromControlSystem();
          ctl.p_parent = null;
          ctl.p_root = null;
        }

        p_list.clear();
        p_mapNames.clear();
        }


        void invalidateAll()
        {
        for (int i = 0; i < p_list.length; i++)
        {
          p_list[i].invalidateAll();
        }
        }


        void updateScaleWidthAbsAll()
        {
        for (int i = 0; i < p_list.length; i++)
        {
          p_list[i].p_scaleWidthAbs = p_control.scaleWidthAbs * p_list[i].scaleWidth;
          p_list[i].controls.updateScaleWidthAbsAll();
        }
        }


        void updateScaleHeightAbsAll()
        {
        for (int i = 0; i < p_list.length; i++)
        {
          p_list[i].p_scaleHeightAbs = p_control.scaleHeightAbs * p_list[i].scaleHeight;
          p_list[i].controls.updateScaleHeightAbsAll();
        }
        }


        void updateOpacityAll()
        {
        for (int i = 0; i < p_list.length; i++)
        {
          p_list[i].p_opacityAbs = p_control.opacityAbs * p_list[i].opacity;
          p_list[i].controls.updateOpacityAll();
        }
        }


        void renderAll()
        {
        for (int i = 0; i < p_list.length; i++)
        {
          p_list[i].render();
        }
        }


        void tickAll()
        {
        for (int i = 0; i < p_list.length; i++)
        {
          p_list[i].tick();
        }
        }


        void sortByZ()
        {
        p_listSortedByZ.sort(p_compareZ);
        }


        void sortByZIndex()
        {
        p_list.sort(p_compareZIndex);
        }


        Control findMouseEnabledControlAtPoint(Point ptRoot, Point ptLocal) 
        {
        for (int i = p_list.length - 1; i >= 0; i--)
        {
          Control ctlTmp = p_list[i];

          if (!ctlTmp.isVisible || ctlTmp.opacityAbs <= ctlTmp.opacityMin) continue;

          bool bAllowMouseEvents = ctlTmp.isAllowMouseEvents;

          Point ptCtlTmpLocal = ctlTmp.parentToLocal(ptLocal);
          bool bInsideCtlTmp = ctlTmp.surface != null ? ctlTmp.surface.hitTest(ptRoot, ptCtlTmpLocal) : false; // Is the point inside mshellCtlTmp?

          //----- Check all the child controls of mshellCtlTmp for a hit,
          //----- if mshellCtlTmp isn't clipping child controls, or if the point was
          //----- within the bounds of mshellCtlTmp.
          if (!ctlTmp.isClipChildControls || bInsideCtlTmp)
          {
            Control mshellCtl = ctlTmp.controls.findMouseEnabledControlAtPoint(ptRoot, ptCtlTmpLocal);
            if (mshellCtl != null)
            {
              return mshellCtl;
            }
          }

          //----- The point wasn't inside any child control of mshellCtlTmp.
          //----- If it was inside mshellCtlTmp, return mshellCtlTmp, otherwise return null.
          if (bInsideCtlTmp && bAllowMouseEvents) return ctlTmp;
          else continue;
        }

        return null;
        }


        /*====================================================================*
        START: Compare control Z order 
        *====================================================================*/
        int p_compareZ(Control ctl1, Control ctl2)
        {
        if (ctl1.z == ctl2.z) return this.p_compareHash(ctl1, ctl2);
        else if (ctl1.z > ctl2.z) return 1;
        else return -1;
        }


        int p_compareZIndex(Control ctl1, Control ctl2)
        {
        if (ctl1.zIndex == ctl2.zIndex) return this.p_compareHash(ctl1, ctl2);
        else if (ctl1.zIndex > ctl2.zIndex) return 1;
        else return -1;
        }


        int p_compareHash(Control ctl1, Control ctl2)
        {
        if (ctl1.hashCode == ctl2.hashCode) return 0;
        else if (ctl1.hashCode < ctl2.hashCode) return -1;
        else return 1;
        }
    }
}