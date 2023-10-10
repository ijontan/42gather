import { writable } from "svelte/store";

/**
 * @enum {number}
 */
export const DialogType ={
    normal: 0,
    error: 1,
    warning: 2,
}

export class DialogData{
    /** @type {DialogType} */
    type;
    /** @type {string} */
    title;
    /** @type {string} */
    message;
    /** @type {number=} */
    timeout;
    /** @type {string} */
    id;
    /** @type {number} */
    duration;


    /**
     * @param {DialogType} type
     * @param {string} title
     * @param {string} message
     * @param {number} duration
     * @constructor
     */
    constructor(type, title, message, duration){
        this.type = type;
        this.title = title;
        this.message = message;
        this.id = crypto.randomUUID();
        this.duration = duration;
    }

    /**
     * @param {string} id
     * @returns {boolean}
     */
    checkId(id){
        return this.id === id;
    }
}

class DialogDelegate {
    /** @type {import("svelte/store").Writable<DialogData[]>} */
    static dialogs = writable([]);

    /**
     * @param {DialogType} type
     * @param {string} title
     * @param {string} message
     * @param {number=} duration
     */
    static show(type, title, message, duration = 3000){
        const dialog = new DialogData(type, title, message, duration);
        this.dialogs.update(dialogs => [...dialogs, dialog]);
        if(!dialog.timeout){
            // @ts-ignore
            dialog.timeout = setTimeout(() => {
                console.log("timeout");
                this.dialogs.update(dialogs => dialogs.filter(d => !d.checkId(dialog.id)));
            }, duration + 1000);
        }
    }

    /**
     * @param {function(DialogData[]): void} callback
     */
    static subscribe(callback){
        return DialogDelegate.dialogs.subscribe(callback);
    }

    static clear(){
        this.dialogs.update(dialogs => dialogs.filter(d => !d.timeout));
    }
}

export default DialogDelegate;