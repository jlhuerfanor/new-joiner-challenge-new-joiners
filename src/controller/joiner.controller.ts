import {controller, httpGet, httpPost} from "inversify-express-utils";
import {inject} from 'inversify';
import {TYPES} from '../types';
import {Request} from 'express';
import {CreateProfileBusiness} from '../business/status/create-profile.business';

@controller('/api/joiner')
export class JoinerController {
    private createProfileBusiness: CreateProfileBusiness;

    constructor(
        @inject(TYPES.CreateProfileBusiness) createProfileBusiness: CreateProfileBusiness
    ) {
        this.createProfileBusiness = createProfileBusiness;
    }

    @httpPost('/profile')
    public addProfile(request: Request): Promise<void> {
        return this.createProfileBusiness.create(request.body);
    }
}
