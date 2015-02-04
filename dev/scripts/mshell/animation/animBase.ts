
/// <reference path='animQueue.ts' />
/// <reference path='animEase.ts' />
/// <reference path='hiResTimer/hiResTimer.ts' />
/// <reference path='hiResTimer/iHiResTimerCounter.ts' />
/// <reference path='../events.ts' />
    
    
module mshell
{
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
    export class AnimBase
    {
        constructor(duration: number = 0.0, ease: Function = null)
        {
            this.p_duration = duration; 
            if (ease != null) this.p_ease = ease;
            else this.p_ease = AnimEase.getEasingFunction(AnimEaseCategory.SINE, AnimEaseType.INOUT);

            this.p_thenAnimQueue = new AnimQueue(this);
            this.p_andAnimQueue = new AnimQueue(this);

            this.done.listen(this.p_onDone);
            this.ticked.listen(this.p_onTicked);
        }


        p_andAnimQueue: AnimQueue;
        p_thenAnimQueue: AnimQueue;

        p_ease: Function;
        p_duration: number = 0.0;

        private _timerCounter: IHiResTimerCounter;
        p_timer: HiResTimer;

        get isTimed(): boolean { return this.p_bTimed; }
        set isTimed(value: boolean) { this.p_bTimed = value; }
        p_bTimed: boolean = true;

        p_bInitialized: boolean = false;
        p_bDone: boolean = false;
        _bDeadBranch: boolean = false; // Internal


        _tick(): void // Internal
        {
            if (!this._bDeadBranch)
            {
                var bAndQueueDead: boolean = false;
                var bThenQueueDead: boolean = false;

                if (this.p_andAnimQueue != null && this.p_andAnimQueue.length() > 0 && !this.p_andAnimQueue.isDead)
                {
                    this.p_andAnimQueue.tick();
                }
                else bAndQueueDead = true;

                if (this.p_bDone)
                {
                    if (this.p_thenAnimQueue != null && this.p_thenAnimQueue.length() > 0 
                        && !this.p_thenAnimQueue.isDead)
                    {
                        this.p_thenAnimQueue.tick();
                    }
                    else bThenQueueDead = true;

                    //----- This anim is a dead branch if it's done animating and both 
                    //----- its andQueue and thenQueue are empty, or dead.
                    if (bAndQueueDead && bThenQueueDead) this._bDeadBranch = true;

                    return;
                }
            }
            else return;


            if (!this.p_bInitialized)
            {
                if (!this.p_bTimed)
                {
                    this.p_onInitialized();
                    this.p_bInitialized = true;
                }
                else if (this.p_timer != null) // Timer hasn't been started, so initialize
                {
                    this.p_onInitialized();
                    if (!this.p_timer.isRunning) this.p_timer.start();
                    this.p_bInitialized = true;
                }  
            }


            if (this.p_bTimed && this.p_timer != null)
            {
                var p: number = this.p_timer.elapsed() / this.p_duration;

                if (p >= 1.0)
                {
                    p = 1.0;
                    this.p_bDone = true;
                    this.p_timer.stop();
                    this.ticked.dispatch(new AnimEventArgs(p));
                    this.done.dispatch(new EventArgs());
                    return;
                }

                this.ticked.dispatch(new AnimEventArgs(p));
            }
        }


        p_onInitialized(): void  { }
        p_onTicked(args: AnimEventArgs): void { }


        //----- done
        done: Signal<EventArgs> = new Signal<EventArgs>();
        //----- Fire event from an external class.
        doDone(): void
        {
            this.p_bDone = true;
            this.p_timer.stop();
            this.done.dispatch(new EventArgs()); 
        }
        p_onDone(args: EventArgs): void { }


        //----- ticked
        ticked: Signal<AnimEventArgs> = new Signal<AnimEventArgs>();


        then(anim: AnimBase): void
        {
            anim.setTimerCounter(this._timerCounter);
            this.p_thenAnimQueue.add(anim);
        }


        and(anim: AnimBase): void 
        {
            anim.setTimerCounter(this._timerCounter);
            this.p_andAnimQueue.add(anim);
        }


        setTimerCounter(timerCounter: IHiResTimerCounter): void
        {
            if (timerCounter == null) return;

            this._timerCounter = timerCounter;

            if (this.p_timer == null) this.p_timer = new HiResTimer(timerCounter.newCounter(), false);

            this.p_andAnimQueue.anims.forEach(function(anim: AnimBase): boolean
            {
                anim.setTimerCounter(timerCounter);
                return true;
            });

            this.p_thenAnimQueue.anims.forEach(function(anim: AnimBase): boolean
            {
                anim.setTimerCounter(timerCounter);
                return true;
            });
        }
    }   
}