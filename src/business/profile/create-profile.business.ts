import {ProfileRepositoryService} from '../../service/api/profile-repository.service';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {Profile} from '../../model/profile';
import {ProfileQueryService} from "../../service/api/profile-query.service";

@injectable()
export class CreateProfileBusiness {
    private profileRepositoryService: ProfileRepositoryService;
    private profileQueryService: ProfileQueryService;

    constructor(
        @inject(TYPES.ProfileRepositoryService) profileRepositoryService: ProfileRepositoryService,
        @inject(TYPES.ProfileQueryService) profileQueryService: ProfileQueryService
    ) {
        this.profileRepositoryService = profileRepositoryService;
        this.profileQueryService = profileQueryService;
    }

    public create(profile: Profile): Promise<void> {
        return this.profileQueryService.checkIdNumberDoesNotExists(profile.idNumber)
            .then(() => this.profileRepositoryService.persist(profile))
            .then((result) => console.log(`Profile persisted in DB. id = ${result.id}`))
    }
}
