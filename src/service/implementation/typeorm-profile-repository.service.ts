import {ProfileRepositoryService} from '../api/profile-repository.service';
import {Profile} from '../../model/profile';
import {Repository} from 'typeorm';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';

@injectable()
export class TypeormProfileRepositoryService implements ProfileRepositoryService {
    public repository: Repository<Profile>;

    constructor(
        @inject(TYPES.ProfileRepository) repository: Repository<Profile>
    ) {
        this.repository = repository;
    }

    persist(profile: Profile): Promise<Profile> {
        return this.repository.save(profile);
    }

    update(idNumber: number, profile: Profile): Promise<Profile | undefined> {
        return this.repository.update({ idNumber: idNumber }, profile)
            .then(result => this.repository.findOne({ idNumber: idNumber }));
    }
}
