import {Profile} from "../../model/profile";

export interface ProfileQueryService {
    checkIdNumberExists(idNumber: number): Promise<void>;
    checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void>

    getByIdNumber(idNumber: number): Promise<Profile | undefined>;
    getIdNumberList(): Promise<number[] | undefined>;
}