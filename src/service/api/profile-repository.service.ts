import { Profile } from '../../model/profile';

export interface ProfileRepositoryService {
    persist(profile: Profile): Promise<Profile>;
}
