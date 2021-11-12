import { padNumber } from "./strings";

export enum LessonPresenceEnum {
    // Student is present
    PRESENT,
    // Student was absent without reason
    ABSENT_NOREASON,
    // Student was absent with reason
    ASBENT_EXEMPT,
    // Student was late to the lesson
    LATE,
}

export interface RoomIDInterface {
    floor: number;
    wing: string[2];
    room: number;
}

export interface LessonInterface {
    // DayMap internal ID
    internalId: string;
    // DayMap raw name
    internalName: string;
    // Formatted name
    name: string;
    // Teacher's name
    teacherName: string;
    // Lesson Room
    location: RoomIDInterface;
    // Lesson time range
    start: Date;
    end: Date;
    // Student presence information
    presence: LessonPresenceEnum;
    // Teacher assigned notes
    notes: string | null;
}

export function getRoomCode(room: RoomIDInterface): string {
    return `${room.floor}${room.wing}${padNumber(room.room, 2)}`
}

export function getLessonPresence(presence: LessonPresenceEnum): string {
    switch (presence) {
        case LessonPresenceEnum.PRESENT:
            return "Present";
        case LessonPresenceEnum.ABSENT_NOREASON:
            return "Absent (no reason)";
        case LessonPresenceEnum.ASBENT_EXEMPT:
            return "Absent (exempt)";
        case LessonPresenceEnum.LATE:
            return "Late";
        default:
            return "Unknown";
    }
}