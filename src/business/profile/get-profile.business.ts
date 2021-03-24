import {Profile} from "../../model/profile";
import {ProfileQueryService} from "../../service/api/profile-query.service";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

@injectable()
export class GetProfileBusiness {
    private profileQueryService: ProfileQueryService;

    constructor(
        @inject(TYPES.ProfileQueryService) profileQueryService: ProfileQueryService
    ) {
        this.profileQueryService = profileQueryService;
    }

    public getByIdNumber(idNumber: number): Promise<Profile | undefined> {
        return this.profileQueryService.getByIdNumber(idNumber);
    }

    public getIdNumberList() : Promise<number[] |undefined> {
        return this.profileQueryService.getIdNumberList();
    }
}