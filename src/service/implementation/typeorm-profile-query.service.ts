import 'reflect-metadata'
import {ProfileQueryService} from "../api/profile-query.service";
import {inject, injectable} from "inversify";
import { Repository, Not } from "typeorm";
import {Profile} from "../../model/profile";
import {TYPES} from "../../types";

@injectable()
export class TypeormProfileQueryService implements ProfileQueryService {
    private repository: Repository<Profile>;

    constructor(
        @inject(TYPES.ProfileRepository) repository: Repository<Profile>
    ) {
        this.repository = repository;
    }

    getIdNumberList(): Promise<number[] | undefined> {
        return this.repository.query('SELECT id_number FROM joiner.profile')
            .then<number[]>((value) => {
                var array: any[] = value;
                console.log(JSON.stringify(array));
                return array.map(item => item.id_number);
            });
    }

    checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void> {
        return this.repository.find({ where: { idNumber: idNumber }})
            .then((profiles) => profiles.filter((value) => !(exceptIdNumber) || value.idNumber !== exceptIdNumber).length)
            .then((count) => (count === 0) ? Promise.resolve() : Promise.reject(TypeormProfileQueryService.ERROR_DUPLICATED_ID_NUMBER));
    }

    checkIdNumberExists(idNumber: number): Promise<void> {
        return this.repository.findOneOrFail({ idNumber: idNumber })
            .then(() => Promise.resolve())
            .catch(() => Promise.reject(TypeormProfileQueryService.ERROR_PROFILE_NOT_FOUND_BY_ID_NUMBER));
    }

    getByIdNumber(idNumber: number): Promise<Profile | undefined> {
        return this.repository.findOne({ where: { idNumber: idNumber }});
    }

    public static get ERROR_DUPLICATED_ID_NUMBER():string { return 'Duplicated id number.'; }
    public static get ERROR_PROFILE_NOT_FOUND_BY_ID_NUMBER():string { return 'Profile with given id number does not exists.'; }


}