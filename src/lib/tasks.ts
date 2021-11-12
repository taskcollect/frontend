import dayjs from "dayjs";

export interface Task {
    internalId: string;
    courseId: string;
    name: string;
    courseName?: string | null;
    description: string;
    setOn: dayjs.Dayjs;
    dueOn: dayjs.Dayjs;
    materials: Material[];
    submission: TaskSubmission;
    origin: TaskOrigin;
}

export enum TaskOrigin {
    DAYMAP, CLASSROOM
}

export interface TaskSubmission {
    internalId: string;
    userId: string;
    late: boolean;
    status: TaskSubmissionStatus;
}

export enum TaskSubmissionStatus {
    PENDING,
    TURNED_IN,
    GRADED,
}

export interface Material {
    link: string;
    title: string;
}
