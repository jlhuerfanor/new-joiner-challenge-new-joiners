import {Status} from '../../model/status';

export interface StatusService {
    status(): Status | null;
}
