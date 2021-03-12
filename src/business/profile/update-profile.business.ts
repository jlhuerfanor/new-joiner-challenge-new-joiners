import {ProfileRepositoryService} from '../../service/api/profile-repository.service';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {Profile} from '../../model/profile';
import {ProfileQueryService} from "../../service/api/profile-query.service";

@injectable()
export class UpdateProfileBusiness {
    private profileRepositoryService: ProfileRepositoryService;
    private profileQueryService: ProfileQueryService;

    constructor(
        @inject(TYPES.ProfileRepositoryService) profileRepositoryService: ProfileRepositoryService,
        @inject(TYPES.ProfileQueryService) profileQueryService: ProfileQueryService
    ) {
        this.profileRepositoryService = profileRepositoryService;
        this.profileQueryService = profileQueryService;
    }

    public update(idNumber: number, profile: Profile): Promise<void> {
        return this.profileQueryService.checkIdNumberExists(idNumber)
            .then(() => this.profileQueryService.checkIdNumberDoesNotExists(profile.idNumber, idNumber))
            .then(() => this.profileRepositoryService.update(idNumber, profile))
            .then((result) => console.log(`Profile updated in DB. id = ${result?.id}`))
    }
}
