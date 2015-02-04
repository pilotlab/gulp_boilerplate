
/// <reference path='animBase.ts' />
/// <reference path='../collections/list.ts' />


module mshell
{
    
    
    export class AnimQueue
    {
        constructor(parentAnim: AnimBase)
        {
            this._parentAnim = parentAnim;
            this.anims = new List<AnimBase>();
        }


        private _parentAnim: AnimBase = null;
        anims: List<AnimBase> = null;
        p_deadAnims: List<AnimBase> = null;

        get isDead(): boolean { return this._bDead; }
        private _bDead: boolean = false;

        length(): number { if (this.anims != null) return this.anims.length; else return 0; }


        add(anim: AnimBase): void
        {
            if (this.anims != null) this.anims.add(anim);
        }


        clear(): void
        {
            this.anims.clear();
        }


        tick(): void
        {
            var anim: AnimBase = null;
            var bDeadBranch: boolean = true;
            for (var i: number = 0; i < this.anims.length; i++)
            {
                anim = this.anims[i];
                if (anim._bDeadBranch == false)
                {
                    bDeadBranch = false;
                    anim._tick();
                }
                //----- _colDeadAnims will be null unless this is the AnimManager.
                //----- If that's the case, collect this dead anim for cleanup.
                else if (this.p_deadAnims != null) this.p_deadAnims.add(anim);
            }

            if (bDeadBranch && !this._bDead)
            {
                this._bDead = true;
            }
        }
    }
}