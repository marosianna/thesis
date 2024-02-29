import { ExaminationStatus } from "./ExaminationStatus";
import { ExaminationType } from "./ExaminationType";
import { User } from "./User";

export interface Examination {
    id: number;
    referralNumber: number;
    examinationType: ExaminationType;
    examinationStatus: ExaminationStatus;
    user: User;
    date: Date;
}
