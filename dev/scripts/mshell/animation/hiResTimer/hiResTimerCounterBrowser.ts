
/// <reference path="iHiResTimerCounter.ts" />
    
    
module mshell
{
    export class HiResTimerCounterBrowser implements IHiResTimerCounter
    {
        constructor() {}

        /*
        * Stores the frequency of the high-resolution performance counter. 
        * This value cannot change while the system is running.
        */
        get frequency(): number { return this._frequency; }
        private _frequency: number = 1000;

        get count(): number { return window.performance.now(); }

        newCounter(): IHiResTimerCounter { return new HiResTimerCounterBrowser(); }
    }
}