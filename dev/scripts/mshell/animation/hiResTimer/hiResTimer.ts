
/// <reference path="iHiResTimerCounter.ts" />
    
    
module mshell
{
    /*
    * Provides a high-resolution timer. 
    *
    * <p>The resolution of the timer varies by system. You can determine the resolution of a given 
    * HiResTimer instance by calling one of the ResolutionXXX methods.</p>
    * 
    * <p>To use HiResTimer create a new instance and call Start() - or pass true to the constructor. 
    * Call Stop() to stop a running timer. Call Start() to restart a stopped timer. 
    * Call Start(true) to restart and reset a stopped timer. Call one of the ElapsedXXX methods 
    * on a running or stopped timer to get the elapsed time in the units you prefer. 
    * Check the IsRunning property to determine if the timer is running.</p>
    * 
    * <code>
    *     int sleepCount = 750;
    *     String formattedCount = sleepCount.toString();
    *
    *     HiResTimer timer = new HiResTimer();
    *
    *     print("Timer resolution: ");
    *     print(timer.resolution() + " seconds, ");
    *     print(timer.resolutionMilliseconds() + "milliseconds, ");
    *     print(timer.resolutionMicroseconds() + "microseconds.");
    *
    *     //----- Start the timer then go to sleep.
    *     timer.start();
    *     print("Timer started: sleeping for " + formattedCount + " milliseconds.");
    *   
    *     // Time will accumulate for this sleep because the timer is running.
    *     Thread.sleep(sleepCount);
    *
    *     //----- Pause the timer
    *     timer.stop();
    *
    *     print("Timer paused: sleeping for " + formattedCount + " milliseconds.");
    *   
    *     //----- Time will not accumulate for this sleep because the timer is paused.
    *     Thread.sleep(sleepCount);
    *
    *     //----- Restart the timer and go back to sleep
    *     timer.start();
    *     print("Timer restarted: sleeping for " + formattedCount + " milliseconds.");
    *
    *     //----- Time will accumulate for this sleep because the timer is running.
    *     Thread.sleep(sleepCount);
    *
    *     //----- Stop timing and output the results.
    *     timer.stop();
    *
    *     print("Timer stopped\n");
    *     print("Run Time: ");
    *     print(timer.Elapsed() + " seconds, ");
    *     print(timer.ElapsedMilliseconds() + "milliseconds, ");
    *     print(timer.ElapsedMicroseconds() + "microseconds.");
    *
    * </code>
    */
    export class HiResTimer
    {
        /*
        * Initializes a new instance and starts the timer if passed true.
        * @param {boolean} [bStartTimer] Controls whether the timer is started after the HiResTimer is initialized.
        */
        constructor(counter: IHiResTimerCounter, bStartTimer: boolean = false) 
        {
            this._counter = counter;
            this.init(bStartTimer); 
        }


        private _counter: IHiResTimerCounter = null;


        /*
        * Stores the start count or the elapsed ticks depending on context.
        */
        private _start: number = 0;


        /*
        * Stores the amount of time to adjust the results of the timer to account
        * for the time it takes to run the HiResTimer code.
        */
        private _adjustment: number = 0;


        /*
        * Initializes the HiResTimer mshellCtls. Does all the heavy lifting for the public constructors.
        * @param {boolean} [bStartTimer] Controls whether the timer is started after the HiResTimer is initialized.</param>
        */
        init(bStartTimer: boolean): void 
        {
            //----- If the adjustment value hasn't been calculated yet then calculate it.
            if(this._adjustment == 0)
            { 
                //----- Time the timer code so we will know how much of an adjustment
                //----- is needed.
                this._start = 0; 
                this._adjustment = 0; 
                this.start(false);
                this.stop(); 
                this._adjustment = this._start;
            }

            //----- The following needs to happen every time we initialize
            this._start = 0;
            if (bStartTimer) this.start(false); 
        }


        /*
        * Start the timer.
        * @param {boolean} [bResetTimer] Controls whether the timer is reset before starting.
        * Pass false and any new elapsed time will be added to the existing elapsed time.
        * Pass true and any existing elapsed time is lost and only the new elapsed time is preserved.
        */
        start(bResetTimer: boolean = false): void 
        {
            var count: number = this._counter.count;

            if((!bResetTimer) && (0 > this._start)) this._start += count; // We are starting with an accumulated time
            else this._start = count; // We are starting from 0
        }


        /*
        * Stop timing. Call one of the ElapsedXXX methods to get the elapsed time since Start() was
        * called. Call Start(false) to restart the timer where you left off. Call Start(true) to
        * restart the timer from 0.
        */
        stop(): void 
        { //----- Stop timing. Use Start afterwards to continue
            if (this._start <= 0) { return; } // The timer was not running
            this._start = this.elapsedTicks();
        }


        elapsedTicks(): number
        {
            var elapsedTicks: number = this._start;

            var count: number = this._counter.count;

            elapsedTicks += -count; // Stopped timer keeps elapsed timer ticks as a negative 

            if (elapsedTicks < this._adjustment) elapsedTicks -= this._adjustment; // Adjust for time timer code takes to run, but don't overflow
            else elapsedTicks = 0; // Stop must have been called directly after Start

            return elapsedTicks;
        } 


        /*
        * Indicates whether the timer is running or not.
        */
        isRunning(): boolean
        { 
            //----- Returns FALSE if stopped.
            var result: boolean = (this._start > 0); // When < 0, holds elpased clicks
            return result;
        }


        /*
        * Returns the number of seconds elapsed since the timer started.
        * <returns>The number of seconds elapsed.
        */
        elapsed(): number
        {
            return -this.elapsedTicks() / this._counter.frequency; 
        }


        /*
        * Returns the number of milliseconds elapsed since the timer started.
        * @return {number} The number of milliseconds elapsed.
        */
        elapsedMilliseconds(): number 
        { 
            return (-this.elapsedTicks() * 1000) / this._counter.frequency; 
        }


        /*
        * Returns the number of microseconds elapsed since the timer started.
        * @return {number} The number of microseconds elapsed.
        */
        elapsedMicroseconds(): number
        { 
            return (-this.elapsedTicks() * 1000000) / this._counter.frequency; 
        }


        /*
        * Returns the timer resolution in seconds.
        * @return {number} Then number of seconds of resolution.
        */
        resolution(): number 
        {
            return 1.0 / this._counter.frequency;
        }


        /*
        * Returns the timer resolution in milliseconds.
        * @return {number} Then number of milliseconds of resolution.
        */
        resolutionMilliseconds(): number 
        {
            return 1000.0 / this._counter.frequency;
        }


        /*
        * Returns the timer resolution in microseconds.
        * @return {number} Then number of microseconds of resolution.
        */
        resolutionMicroseconds(): number  
        {
            return 1000000.0 / this._counter.frequency;
        }
    }
}