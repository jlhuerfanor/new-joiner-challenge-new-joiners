import {controller, httpGet, httpPatch, httpPost, request, requestParam, response} from "inversify-express-utils";
import {inject} from 'inversify';
import {TYPES} from '../types';
import {Request, Response} from 'express';
import {CreateProfileBusiness} from '../business/profile/create-profile.business';
import {UpdateProfileBusiness} from "../business/profile/update-profile.business";
import {ProfileUpdate} from "../model/profile-update";
import {GetProfileBusiness} from "../business/profile/get-profile.business";

@controller('/joiner')
export class JoinerController {
    private createProfileBusiness: CreateProfileBusiness;
    private updateProfileBusiness: UpdateProfileBusiness;
    private getProfileBusiness: GetProfileBusiness;

    constructor(
        @inject(TYPES.CreateProfileBusiness) createProfileBusiness: CreateProfileBusiness,
        @inject(TYPES.UpdateProfileBusiness) updateProfileBusiness: UpdateProfileBusiness,
        @inject(TYPES.GetProfileBusiness) getProfileBusiness: GetProfileBusiness
    ) {
        this.createProfileBusiness = createProfileBusiness;
        this.updateProfileBusiness = updateProfileBusiness;
        this.getProfileBusiness = getProfileBusiness;
    }

    @httpPost('')
    public addProfile(@request() request: Request, @response() response: Response): Promise<void> {
        return this.createProfileBusiness.create(request.body)
            .then(() => { response.sendStatus(204); })
            .catch((error) => { response.status(400).json(JoinerController.errorBody(request.path, 400, error)) });
    }

    @httpPatch('')
    public updateProfile(@request() request: Request, @response() response: Response) {
        const profileUpdate: ProfileUpdate = request.body;
        return this.updateProfileBusiness.update(profileUpdate.idNumber, profileUpdate.value)
            .then(() => { response.sendStatus(204); })
            .catch((error) => { response.status(400).json(JoinerController.errorBody(request.path, 400, error)) });
    }

    @httpGet('/:id')
    public getProfile(@request() request: Request, @response() response: Response, @requestParam('id') idNumber: string) {
        return this.getProfileBusiness.getByIdNumber(Number(idNumber))
            .then((value) => { response.status(200).json(value); })
            .catch((error) => { response.status(400).json(JoinerController.errorBody(request.path, 400, error)) });
    }

    @httpGet('')
    public getIdNumberList(@request() request: Request, @response() response: Response) {
        return this.getProfileBusiness.getIdNumberList()
            .then((value) => { response.status(200).json(value); })
            .catch((error) => { response.status(400).json(JoinerController.errorBody(request.path, 400, error)) });
    }

    private static errorBody(path: string, status: number, message: any): any {
        return {
            timestamp: (new Date().toISOString()),
            status: status,
            message: message,
            path: path
        };
    }
}
