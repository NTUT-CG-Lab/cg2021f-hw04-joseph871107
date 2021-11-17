export class MorphContainer{
    static pairList = {
        'eyebrow_troubled':	[2, ['困る', '困り']],              // 0
        'eyebrow_angry':	[2, ['怒る', '怒り']],              // 1
        'eyebrow_serious':	[2, ['真面目']],                    // 2
        'eyebrow_happy':	[2, ['にこり', 'にこ', 'にこっ']],   // 3
        'eyebrow_lowered':	[2, ['下', '眉下']],                // 4
        'eyebrow_raised':	[2, ['上', '眉上']],                // 5

        'eye_wink':	[2, ['まばたき', 'ウィンク']],               // 6
        'eye_happy_wink':	[2, ['笑い']],                      // 7
        'eye_relaxed':	[2, ['なごみ']],                        // 8
        'eye_unimpressed':	[2, ['ジト目']],                    // 9
        'eye_raised_lower_eyelid':	[2, ['下瞼上げ']],          // 10
        'eye_surprised':	[2, ['びっくり']],                  // 11
        'iris_small':	[2, ['瞳小']],                          // 12

        'mouth_aaa':	[1, ['あ']],                            // 13
        'mouth_iii':	[1, ['い']],                            // 14
        'mouth_uuu':	[1, ['う']],                            // 15
        'mouth_eee':	[1, ['え']],                            // 16
        'mouth_ooo':	[1, ['お']],                            // 17
        'mouth_delta':	[1, ['Δ', '▲']],                        // 18
        'mouth_smirk':	[1, ['はんっ！']],                       // 19
        'mouth_raised_corner':	[2, ['口角上げ', 'v']],          // 20
        'mouth_lowered_corner':	[2, ['口角下げ']],               // 21
    };

    constructor(stdlistGui, morphsGui){
        this.stdlistGui = stdlistGui;
        this.morphsGui = morphsGui;

        this.pairList = {};
        for (const key of Object.keys(this.constructor.pairList)){
            var content = this.constructor.pairList[key];
            var relatedMorphs = [];
            for (const index of content[1]){
                relatedMorphs.push(this.morphsGui.getControlIndex(index));
            }
            relatedMorphs = relatedMorphs.filter((el) => {return el != null});
            relatedMorphs.sort();
            var relatedMorph = -1;
            if (relatedMorphs.length > 0)
                relatedMorph = relatedMorphs[0];
            switch (content[0]){
                case 1:
                    this.pairList[key] = relatedMorph;
                    break;
                case 2:
                    this.pairList[key + '_left'] = relatedMorph;
                    this.pairList[key + '_right'] = relatedMorph;
                    break;
            }
        }
    }

    toJSON(){
        var obj = {};
        var keys = Object.keys(this.pairList);
        for(var i=0; i<keys.length; i++){
            var key = keys[i];
            obj[String(i)] = this.pairList[key];
        }
        return obj;
    }
}