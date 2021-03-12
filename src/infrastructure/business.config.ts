import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import {StatusBusiness} from '../business/status/status.business';
import {TYPES} from '../types';
import {CreateProfileBusiness} from '../business/profile/create-profile.business';
import {UpdateProfileBusiness} from "../business/profile/update-profile.business";
import {GetProfileBusiness} from "../business/profile/get-profile.business";

@injectable()
export class BusinessConfig implements Configuration{
    public configure(container: Container): void {
        container.bind<StatusBusiness>(TYPES.StatusBusiness).to(StatusBusiness);
        container.bind<CreateProfileBusiness>(TYPES.CreateProfileBusiness).to(CreateProfileBusiness);
        container.bind<UpdateProfileBusiness>(TYPES.UpdateProfileBusiness).to(UpdateProfileBusiness);
        container.bind<GetProfileBusiness>(TYPES.GetProfileBusiness).to(GetProfileBusiness);
    }
}
