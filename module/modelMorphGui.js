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

        const controls = {};
        const keys = [];

        const morphs = gui.addFolder('stdlist');

        var scope = this;

        function initControls() {
            for (const key in dictionary) {
                controls[key] = -1;
            }
        }

        function initKeys() {
            for (const key in dictionary) {
                keys.push(key);
            }
        }

        function initMorphs() {
            for (const key in dictionary) {
                morphs.add(controls, key, 0, 1, 0.01).onChange(onChangeMorph);
            }
        }

        function onChangeMorph() {
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = controls[key];
                if (0 <= value && value <= 1)
                    scope.modelLoaderPtr.current.model.object3D.morphTargetInfluences[i] = value;
            }
        }
        this.controls = controls;

        initControls();
        initKeys();
        initMorphs();

        onChangeMorph();

        morphs.open();

        this.gui = {
            morphs: morphs,
        }
    }

    set guiShow(flag){
        if (flag){
            this.gui.morphs.open();
        }else{
            this.gui.morphs.close();
        }
    }
}