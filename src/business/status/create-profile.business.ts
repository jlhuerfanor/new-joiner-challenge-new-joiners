import {ProfileRepositoryService} from '../../service/api/profile-repository.service';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {Profile} from '../../model/profile';

@injectable()
export class CreateProfileBusiness {
    private profileRepositoryService: ProfileRepositoryService;

    constructor(
        @inject(TYPES.ProfileRepositoryService) profileRepositoryService: ProfileRepositoryService
    ) {
        this.profileRepositoryService = profileRepositoryService;
    }

    public create(profile: Profile): Promise<void> {
        return this.profileRepositoryService.persist(profile)
            .then((result) => console.log(`Profile persisted in DB. id = ${result.id}`))
    }
}
