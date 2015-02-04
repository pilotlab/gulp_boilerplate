
/// <reference path='animQueue.ts' />
/// <reference path='animWrapper.ts' />
    
    
module mshell
{
    export class AnimManager extends AnimQueue
    {
        constructor(timerCounter: IHiResTimerCounter = null)
        {
            super(null);
            
            this.p_timerCounter = this.timerCounter;
            this.p_deadAnims = new List<AnimBase>();
        }


        get timerCounter(): IHiResTimerCounter { return this.p_timerCounter; }
        set timerCounter(value: IHiResTimerCounter)
        {
            this.p_timerCounter = value;

            this.anims.forEach(function(anim: AnimBase): boolean
            {
                anim.setTimerCounter(value);
                return true;
            });
        }
        p_timerCounter: IHiResTimerCounter = null;


        ticked: Signal<EventArgs> = new Signal<EventArgs>();


        tick(): void
        {
            if (this.p_timerCounter == null) return;

            super.tick();

            //----- Cleanup all the dead anims.
            for (var i: number = 0; i < this.p_deadAnims.length; i++)
            {
                this.anims.remove(this.p_deadAnims[i]);
            }

            this.p_deadAnims.clear();

            this.ticked.dispatch(new EventArgs());
        }


        add(anim: AnimBase): void
        {
            anim.setTimerCounter(this.p_timerCounter);
            super.add(anim);
        }


        run(animWrap: AnimWrapper): AnimWrapper
        {
            this.add(animWrap.anim);
            return animWrap;
        }

    }
}