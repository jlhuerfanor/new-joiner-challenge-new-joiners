import {StatusService} from '../api/status.service';
import {Status} from '../../model/status';
import {injectable} from 'inversify';

@injectable()
export class DefaultStatusService implements StatusService {
    status(): Status | null {
        return {
          status: 'OK'
        };
    }
}
