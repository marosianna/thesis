import { ExaminationStatus } from "./ExaminationStatus";
import { ExaminationType } from "./ExaminationType";
import { TimeSlot } from "./TimeSlot";

export interface ExaminationResponseByFilter {
    id: number;
    referralNumber: string;
    type: ExaminationType;
    status: ExaminationStatus;
    date: Date;
    time: TimeSlot;
    firstName: string;
    lastName: string;
    medId: number;
}