module mshell
{
    export interface IHiResTimerCounter
    {
        frequency: number;
        count: number;

        newCounter(): IHiResTimerCounter;
    }
}