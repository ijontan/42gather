
/**
 * @typedef {Object} UserDataProps
 * @property {string} intraName
 * @property {string} name
 * @property {string} imageLink
 */

/**
 * @typedef {Object} UserDataCopyProps
 * @property {string | null} intraName
 * @property {string | null} name
 * @property {string | null} imageLink
 */

export default class UserData{
    /** @type {string | null=} */
    discordID;
    /** @type {string} */
    intraName;
    /** @type {string} */
    name;
    /** @type {string} */
    imageLink;

    /**
     * 
     * @param {UserDataProps} param0 
     */
    constructor({intraName, name, imageLink}){
        this.intraName = intraName;
        this.name = name;
        this.imageLink = imageLink;
    }

    /**
     * 
     * @param {UserDataCopyProps} param0 
     */
    copyWith({intraName, name, imageLink}){
        return new UserData({
            intraName: intraName ?? this.intraName,
            name: name ?? this.name,
            imageLink: imageLink ?? this.imageLink
        });
    }


    static empty(){
        return new UserData({
            intraName: "--",
            name: "--",
            imageLink: "--"
        });
    }
}