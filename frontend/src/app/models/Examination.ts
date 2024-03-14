import { ExaminationStatus } from "./ExaminationStatus";
import { ExaminationType } from "./ExaminationType";
import { TimeSlot } from "./TimeSlot";
import { User } from "./User";

export interface Examination {
    id: number;
    referralNumber: string;
    type: ExaminationType;
    status: ExaminationStatus;
    user?: User;
    date: Date;
    time: TimeSlot;
}
