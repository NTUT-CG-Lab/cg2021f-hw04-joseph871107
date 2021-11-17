import { BasicLoader } from '/module/modelLoader.js';

export class ModelMorphGui{
    constructor(modelLoaderPtr, gui, callback = function(){}){
        this.modelLoaderPtr = modelLoaderPtr;
        this.gui = gui;
        this.callback = callback;
        
        this.standardlist = {
            "eyebrow_troubled_left":0,
            "eyebrow_troubled_right":0,
            "eyebrow_angry_left":0,
            "eyebrow_angry_right":0,
            "eyebrow_serious_left":0,
            "eyebrow_serious_right":0,
            "eyebrow_happy_left":0,
            "eyebrow_happy_right":0,
            "eyebrow_lowered_left":0,
            "eyebrow_lowered_right":0,
            "eyebrow_raised_left":0,
            "eyebrow_raised_right":0,
            "eye_wink_left":0,
            "eye_wink_right":0,
            "eye_happy_wink_left":0,
            "eye_happy_wink_right":0,
            "eye_relaxed_left":0,
            "eye_relaxed_right":0,
            "eye_unimpressed_left":0,
            "eye_unimpressed_right":0,
            "eye_raised_lower_eyelid_left":0,
            "eye_raised_lower_eyelid_right":0,
            "eye_surprised_left":0,
            "eye_surprised_right":0,
            "iris_small_left":0,
            "iris_small_right":0,
            "mouth_aaa":0,
            "mouth_iii":0,
            "mouth_uuu":0,
            "mouth_eee":0,
            "mouth_ooo":0,
            "mouth_delta":0,
            "mouth_smirk":0,
            "mouth_raised_corner_left":0,
            "mouth_raised_corner_right":0,
            "mouth_lowered_corner_left":0,
            "mouth_lowered_corner_right":0
        };
        this.textArray = Object.keys(this.standardlist);

        this.initGui();
        this.callback(this);
    }

    static getBaseName(s) {
        return s.slice(s.lastIndexOf('/') + 1);
    }

    initGui() {
        const gui = this.gui;

        const dictionary = this.standardlist;
        this.dictionary = Object.keys(dictionary);
        this.controlDictionary = Object.keys(dictionary);

        const morphs = gui.addFolder('stdlist');

        this.gui = {
            morphs: morphs,
        }
        this.controllers = [];

        morphs.open();
    }

    initMorphs(dictionary) {
        this.controllers = [];
        for (const key of dictionary) {
            var controller = this.gui.morphs.add(this.controls, key);
            this.controllers.push(controller);
        }
    }

    getControlIndex(index){
        var found = this.dictionary.indexOf(index);
        if (found != -1)
            return this.controlDictionary.indexOf(this.controlDictionary[found]);
        else
            return null;
    }

    updateControls(morphContainer){
        for(const controller of this.controllers)
            this.gui.morphs.remove(controller);
        this.controls = morphContainer.pairList;
        this.initMorphs(this.dictionary);
        this.gui.morphs.updateDisplay();
    }

    set guiShow(flag){
        if (flag){
            this.gui.morphs.open();
        }else{
            this.gui.morphs.close();
        }
    }
}