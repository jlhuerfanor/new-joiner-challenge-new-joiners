import 'reflect-metadata'
import { describe, it } from 'mocha';
import { expect, AssertionError } from 'chai';
import * as sinon from 'sinon';
import {Profile} from "../../src/model/profile";
import {FindManyOptions, FindOneOptions, ObjectID, Repository} from "typeorm";
import {TypeormProfileQueryService} from "../../src/service/implementation/typeorm-profile-query.service";


describe('TypeormProfileQueryService', function () {
    it("checkIdNumberDoesNotExistsSuccess", function () {
        const repository = <Repository<Profile>> {
            find(options?: FindManyOptions<Profile>): Promise<Profile[]> {
                return Promise.resolve([]);
            }
        };
        const profileQueryService = new TypeormProfileQueryService(repository);

        const findCall = sinon.spy(repository, 'find');

        return profileQueryService.checkIdNumberDoesNotExists(1)
            .then(() => {
                sinon.assert.calledOnce(findCall);
            });
    });
    it("checkIdNumberDoesNotExistsFails", function () {
        const repository = <Repository<Profile>> {
            find(options?: FindManyOptions<Profile>): Promise<Profile[]> {
                return Promise.resolve([<Profile>{ idNumber: 1 }]);
            }
        };
        const profileQueryService = new TypeormProfileQueryService(repository);

        const findCall = sinon.spy(repository, 'find');

        return profileQueryService.checkIdNumberDoesNotExists(1)
            .then(() => { throw new AssertionError("Shouldn't be here!") })
            .catch((error) => {
                expect(error).to.be.eq(TypeormProfileQueryService.ERROR_DUPLICATED_ID_NUMBER)
                return Promise.resolve();
            });
    });
    it("checkIdNumberDoesNotExistsExceptSuccess", function () {
        const repository = <Repository<Profile>> {
            find(options?: FindManyOptions<Profile>): Promise<Profile[]> {
                return Promise.resolve([<Profile>{ idNumber: 1 }]);
            }
        };
        const profileQueryService = new TypeormProfileQueryService(repository);

        const findCall = sinon.spy(repository, 'find');

        return profileQueryService.checkIdNumberDoesNotExists(1, 1)
            .then(() => {
                sinon.assert.calledOnce(findCall);
            });
    });
    it("checkIdNumberDoesNotExistsExceptFails", function () {
        const repository = <Repository<Profile>> {
            find(options?: FindManyOptions<Profile>): Promise<Profile[]> {
                return Promise.resolve([<Profile>{ idNumber: 2 }]);
            }
        };
        const profileQueryService = new TypeormProfileQueryService(repository);

        const findCall = sinon.spy(repository, 'find');

        return profileQueryService.checkIdNumberDoesNotExists(2, 1)
            .then(() => { throw new AssertionError("Shouldn't be here!") })
            .catch((error) => {
                expect(error).to.be.eq(TypeormProfileQueryService.ERROR_DUPLICATED_ID_NUMBER)
                return Promise.resolve();
            });
    });

    it("checkIdNumberExistsSuccess", function () {
        const repository = <Repository<Profile>> {
            findOneOrFail(id?: string | number | Date | ObjectID, options?: FindOneOptions<Profile>): Promise<Profile> {
                return Promise.resolve(<Profile>{ idNumber: 1 });
            }
        };
        const profileQueryService = new TypeormProfileQueryService(repository);

        const findCall = sinon.spy(repository, 'findOneOrFail');

        return profileQueryService.checkIdNumberExists(1)
            .then(() => {
                sinon.assert.calledOnce(findCall);
            });
    });
    it("checkIdNumberExistsFails", function () {
        const repository = <Repository<Profile>> {
            findOneOrFail(id?: string | number | Date | ObjectID, options?: FindOneOptions<Profile>): Promise<Profile> {
                return Promise.reject();
            }
        };
        const profileQueryService = new TypeormProfileQueryService(repository);

        const findCall = sinon.spy(repository, 'findOneOrFail');

        return profileQueryService.checkIdNumberExists(1)
            .then(() => { throw new AssertionError("Shouldn't be here!") })
            .catch((error) => {
                expect(error).to.be.eq(TypeormProfileQueryService.ERROR_PROFILE_NOT_FOUND_BY_ID_NUMBER)
                return Promise.resolve();
            });
    });

});