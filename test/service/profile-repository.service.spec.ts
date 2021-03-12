import 'reflect-metadata'
import { describe, it } from 'mocha';
import { expect, AssertionError } from 'chai';
import * as sinon from 'sinon';
import {Profile} from "../../src/model/profile";
import {Repository} from "typeorm";
import {PostgresProfileRepositoryService} from "../../src/service/implementation/postgres-profile-repository.service";

describe("PostgresProfileRepositoryService", function() {
    it("persistSuccess", function () {
        const repository = <Repository<Profile>> { save(profile: Profile): Promise<Profile>{ return Promise.resolve(profile); } };
        const repositoryService: PostgresProfileRepositoryService = new PostgresProfileRepositoryService(repository);
        const profile = <Profile>{};

        const persistStub = sinon.stub(repository, 'save')
            .withArgs(sinon.match.same(profile))
            .returns(Promise.resolve(profile));

        return repositoryService.persist(profile)
            .then((result) => {
                expect(result).to.be.eq(profile);
                sinon.assert.calledOnce(persistStub);
            })
            .catch((error) => { throw new AssertionError(`Shouldn't be here! ${error}`); });
    });
    it("persistFails", function () {
        const repository = <Repository<Profile>> { save(profile: Profile): Promise<Profile>{ return Promise.reject('error'); } };
        const repositoryService: PostgresProfileRepositoryService = new PostgresProfileRepositoryService(repository);
        const profile = <Profile>{};

        return repositoryService.persist(profile)
            .then((result) => { throw new AssertionError(`Shouldn't be here!`); })
            .catch((error) => {
                expect(error).to.be.eq('error');
                return Promise.resolve();
            });
    });
});