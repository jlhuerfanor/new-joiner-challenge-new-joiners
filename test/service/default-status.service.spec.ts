import { it } from 'mocha';
import { expect } from 'chai';
import { DefaultStatusService } from '../../src/service/implementation/default-status.service';
import { Status } from '../../src/model/status';

describe('DefaultStatusService', function () {
    it('statusReturnsOk', function () {
        const statusService = new DefaultStatusService();
        const result: Status | null = statusService.status();

        expect(result).to.not.be.null;
        expect(result!.status).eq('OK');
    });
});
