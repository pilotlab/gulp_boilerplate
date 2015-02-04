
/// <reference path='animBase.ts' />
    
    
module mshell
{
    export class AnimWrapper
    {
        constructor(anim: AnimBase)
        {
            this._anim = anim;
            this._first = this;
        }


        get anim(): AnimBase { return this._anim; }
        private _anim: AnimBase = null;

        //----- The first AnimWrapper in the chain.
        get first(): AnimWrapper { return this._first; }
        private _first: AnimWrapper;


        then(animWrap: AnimWrapper): AnimWrapper
        {
            this._anim.then(animWrap._anim);
            animWrap._first = this._first;
            return animWrap;
        }


        and(animWrap: AnimWrapper): AnimWrapper
        {
            this._anim.and(animWrap._anim);
            animWrap._first = this._first;
            return animWrap;
        }
    }
}