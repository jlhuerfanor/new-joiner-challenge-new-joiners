import 'reflect-metadata'
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { StatusService } from '../../src/service/api/status.service';
import {StatusBusiness} from '../../src/business/status/status.business';
import {Status} from '../../src/model/status';

describe('StatusBusiness', () => {
    it('statusCallsStatusService', () => {
        const statusService: StatusService = { status: () => null };
        const statusBusiness = new StatusBusiness(statusService);

        const expectedResult: Status = { status: 'OK' };

        const serviceStub = sinon.stub(statusService, 'status').returns(expectedResult);
        const result = statusBusiness.status;

        expect(result).eq(expectedResult);
        sinon.assert.calledOnce(serviceStub);
    });
});
