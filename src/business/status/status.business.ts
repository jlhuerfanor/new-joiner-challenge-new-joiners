import {inject, injectable} from 'inversify';
import {StatusService} from '../../service/api/status.service';
import {TYPES} from '../../types';
import {Status} from '../../model/status';

@injectable()
export class StatusBusiness {
    private statusService: StatusService;

    constructor(
        @inject(TYPES.StatusService) statusService: StatusService) {
        this.statusService = statusService;
    }

    public get status(): Status | null {
        return this.statusService.status();
    }
}
