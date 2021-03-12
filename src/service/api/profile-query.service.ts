
export interface ProfileQueryService {
    checkIdNumberExists(idNumber: number): Promise<void>;
    checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void>
}