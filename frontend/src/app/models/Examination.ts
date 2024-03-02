import { ExaminationStatus } from "./ExaminationStatus";
import { ExaminationType } from "./ExaminationType";
import { User } from "./User";

export interface Examination {
    id: number;
    referralNumber: number;
    type: ExaminationType;
    status: ExaminationStatus;
    user: User;
    date: Date;
}
