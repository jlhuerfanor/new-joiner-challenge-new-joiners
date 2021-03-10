import {controller, httpGet} from "inversify-express-utils";
import {StatusBusiness} from '../business/status/status.business';
import {inject} from 'inversify';
import {TYPES} from '../types';
import {Status} from '../model/status';

@controller('/api/monitor')
export class StatusController {
    private statusBusiness: StatusBusiness;

    constructor(
        @inject(TYPES.StatusBusiness) statusBusiness: StatusBusiness
    ) {
        this.statusBusiness = statusBusiness;
    }

    @httpGet('/ping')
    public ping(): Status | null {
        return this.statusBusiness.status;
    }

}
