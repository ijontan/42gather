// @ts-ignore
import UserData from "./user";

/**
 * @enum {number}
 */
export const TagsType ={
    evaluation: 0,
    activity: 1,
    rush: 2,
    dinner: 3,
    badminton: 4,
    jogging: 5,
    gaming: 6,
    movie: 7,
}

/**
 * @enum {number}
 */
export const RemindersType ={
    "5 mins": 0,
    "15 mins": 1,
    "1 hour": 3,
    "1 day": 4,
    "1 week": 5,
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
 * @property {string} venue
 * @property {number | null} limit
 * @property {string} description
 * @property {string} datetime
 * @property {TagsType[]} tags
 * @property {RemindersType[]} reminders
 * @property {ColorType} color
 */

/**
 * @typedef EventItemCopyProps
 * @type {object}
 * @property {string | null} title
 * @property {string | null} venue
 * @property {number | null} limit
 * @property {string | null} description
 * @property {string | null} datetime
 * @property {TagsType[] | null} tags
 * @property {RemindersType[] | null} reminders
 * @property {ColorType | null} color
 */

export default class EventData {
    /** @type {string=} */
    id;
    /** @type {UserData[]=} */
    participants;
    /** @type {string} */
    title;
    /** @type {string} */
    venue;
    /** @type {number | null} */
    limit;
    /** @type {string} */
    description;
    /** @type {string} */
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
    constructor({title, venue, limit, description, datetime, tags, reminders, color}){
        this.title = title;
        this.venue = venue;
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
    copyWith({title, venue, limit, description, datetime, tags, reminders, color}){
        return new EventData({
            title: title ?? this.title,
            venue: venue ?? this.venue,
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
            venue: 'The venue to the event',
            limit: -1,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non posuere justo, at rhoncus ipsum. Donec id efficitur nisi. Aenean.',
            datetime: '',
            tags: [0, 1, 2],
            reminders: [0, 1, 2],
            color: Math.floor(Math.random() * 5),
        })
    }

    static empty(){
        return new EventData({
            title: '',
            venue: '',
            limit: null,
            description: '',
            datetime: '',
            tags: [],
            reminders: [],
            color: -1,
        })
    }

    toJson(){
        return JSON.stringify(this);
    }

    /**
     * @param {*} map
     * @returns {EventData}
     */
    static fromMap(map){
        return new EventData({
            title: map.title,
            venue: map.venue,
            limit: map.limit,
            description: map.description,
            datetime: map.datetime,
            tags: map.tags,
            reminders: map.reminders,
            color: map.color,
        })
    }
}