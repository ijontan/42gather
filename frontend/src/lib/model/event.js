
/**
 * @enum {number}
 */
export const TagsType ={
    abc: 1
}

/**
 * @enum {number}
 */
export const RemindersType ={
    abc: 1
}

/**
 * @enum {number}
 */
export const ColorType ={
    orange: 0,
    green: 1,
    teal: 2,
    blue: 3,
    pink: 4,
    yellow: 5,
}

/**
 * @typedef EventDataProps
 * @type {object}
 * @property {string} title
 * @property {string} vanue
 * @property {number} limit
 * @property {string} description
 * @property {Date} datetime
 * @property {TagsType[]} tags
 * @property {RemindersType[]} reminders
 * @property {ColorType} color
 */

/**
 * @typedef EventItemCopyProps
 * @type {object}
 * @property {string | null} title
 * @property {string | null} vanue
 * @property {number | null} limit
 * @property {string | null} description
 * @property {Date | null} datetime
 * @property {TagsType[] | null} tags
 * @property {RemindersType[] | null} reminders
 * @property {ColorType | null} color
 */

export default class EventData {
    /** @type {string=} */
    id;
    /** @type {string} */
    title;
    /** @type {string} */
    vanue;
    /** @type {number} */
    limit;
    /** @type {string} */
    description;
    /** @type {Date} */
    datetime;
    /** @type {TagsType[]} */
    tags;
    /** @type {RemindersType[]} */
    reminders;
    /** @type {ColorType} */
    color;


    /**
     * 
     * @param {EventDataProps} param0
     */
    constructor({title, vanue, limit, description, datetime, tags, reminders, color}){
        this.title = title;
        this.vanue = vanue;
        this.limit = limit;
        this.description = description;
        this.datetime = datetime;
        this.tags = tags;
        this.reminders = reminders;
        this.color = color;
    }

    /**
     * 
     * @param {EventItemCopyProps} param0
     * @returns {EventData} 
     */
    copyWith({title, vanue, limit, description, datetime, tags, reminders, color}){
        return new EventData({
            title: title ?? this.title,
            vanue: vanue ?? this.vanue,
            limit: limit ?? this.limit,
            description: description ?? this.description,
            datetime: datetime ?? this.datetime,
            tags: tags ?? this.tags,
            reminders: reminders ?? this.reminders,
            color: color ?? this.color,
        })
    }

    /**
     *  @returns {EventData}
     */
    static test(){
        return new EventData({
            title: 'the event title',
            vanue: 'The vanue to the event',
            limit: -1,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non posuere justo, at rhoncus ipsum. Donec id efficitur nisi. Aenean.',
            datetime: new Date(),
            tags: [0, 1, 2],
            reminders: [0, 1, 2],
            color: Math.floor(Math.random() * 5),
        })
    }
}