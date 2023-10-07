
/**
 * @typedef {Object} UserDataProps
 * @property {string} intraID
 * @property {string} name
 * @property {string} imageLink
 */

/**
 * @typedef {Object} UserDataCopyProps
 * @property {string | null} intraID
 * @property {string | null} name
 * @property {string | null} imageLink
 */

export default class UserData{
    /** @type {string | null=} */
    discordID;
    /** @type {string} */
    intraID;
    /** @type {string} */
    name;
    /** @type {string} */
    imageLink;

    /**
     * 
     * @param {UserDataProps} param0 
     */
    constructor({intraID, name, imageLink}){
        this.intraID = intraID;
        this.name = name;
        this.imageLink = imageLink;
    }

    /**
     * 
     * @param {UserDataCopyProps} param0 
     */
    copyWith({intraID, name, imageLink}){
        return new UserData({
            intraID: intraID ?? this.intraID,
            name: name ?? this.name,
            imageLink: imageLink ?? this.imageLink
        });
    }
}