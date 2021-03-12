import {controller, httpGet, httpPatch, httpPost, request, response} from "inversify-express-utils";
import {inject} from 'inversify';
import {TYPES} from '../types';
import {Request, Response} from 'express';
import {CreateProfileBusiness} from '../business/profile/create-profile.business';
import {UpdateProfileBusiness} from "../business/profile/update-profile.business";
import {ProfileUpdate} from "../model/profile-update";

@controller('/api/joiner')
export class JoinerController {
    private createProfileBusiness: CreateProfileBusiness;
    private updateProfileBusiness: UpdateProfileBusiness;

    constructor(
        @inject(TYPES.CreateProfileBusiness) createProfileBusiness: CreateProfileBusiness,
        @inject(TYPES.UpdateProfileBusiness) updateProfileBusiness: UpdateProfileBusiness
    ) {
        this.createProfileBusiness = createProfileBusiness;
        this.updateProfileBusiness = updateProfileBusiness;
    }

    @httpPost('/profile')
    public addProfile(@request() request: Request, @response() response: Response): Promise<void> {
        return this.createProfileBusiness.create(request.body)
            .then(() => { response.sendStatus(204); })
            .catch((error) => { response.status(400).json(this.errorBody(request.path, 400, error)) });
    }

    @httpPatch('/profile')
    public updateProfile(@request() request: Request, @response() response: Response) {
        const profileUpdate: ProfileUpdate = request.body;
        return this.updateProfileBusiness.update(profileUpdate.idNumber, profileUpdate.value)
            .then(() => { response.sendStatus(204); })
            .catch((error) => { response.status(400).json(this.errorBody(request.path, 400, error)) });
    }

    private errorBody(path: string, status: number, message: any): any {
        return {
            timestamp: (new Date().toISOString()),
            status: status,
            message: message,
            path: path
        };
    }
}
