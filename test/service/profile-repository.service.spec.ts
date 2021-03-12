import 'reflect-metadata'
import { describe, it } from 'mocha';
import { expect, AssertionError } from 'chai';
import * as sinon from 'sinon';
import {Profile} from "../../src/model/profile";
import {FindConditions, FindManyOptions, FindOneOptions, ObjectID, Repository, UpdateResult} from "typeorm";
import {TypeormProfileRepositoryService} from "../../src/service/implementation/typeorm-profile-repository.service";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

describe("PostgresProfileRepositoryService", function() {
    it("persistSuccess", function () {
        const repository = <Repository<Profile>> {
            save(profile: Profile): Promise<Profile>{ return Promise.resolve(profile); },
            find(options?: FindManyOptions<Profile>): Promise<Profile[]> { return Promise.resolve([]); }
        };
        const repositoryService: TypeormProfileRepositoryService = new TypeormProfileRepositoryService(repository);
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
        const repository = <Repository<Profile>> {
            save(profile: Profile): Promise<Profile>{ return Promise.reject('error'); },
        };
        const repositoryService: TypeormProfileRepositoryService = new TypeormProfileRepositoryService(repository);
        const profile = <Profile>{};

        return repositoryService.persist(profile)
            .then((result) => { throw new AssertionError(`Shouldn't be here!`); })
            .catch((error) => {
                expect(error).to.be.eq('error');
                return Promise.resolve();
            });
    });
    it("updateSuccess", function () {
        const repository = <Repository<Profile>> {
            update(criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Profile>, partialEntity: QueryDeepPartialEntity<Profile>): Promise<UpdateResult> {
                return Promise.resolve(<UpdateResult>{ raw: [ profile ] });
            },
            find(options?: FindManyOptions<Profile>): Promise<Profile[]> { return Promise.resolve([]); },
            findOne(id?: string | number | Date | ObjectID, options?: FindOneOptions<Profile>): Promise<Profile | undefined> {
                return Promise.resolve(undefined);
            }
        };
        const repositoryService: TypeormProfileRepositoryService = new TypeormProfileRepositoryService(repository);
        const profile = <Profile>{};

        const updateStub = sinon.stub(repository, 'update')
            .withArgs(sinon.match.any, sinon.match.same(profile))
            .returns(Promise.resolve(<UpdateResult>{ raw: [ profile ] }));
        const findStub = sinon.stub(repository, 'findOne')
            .withArgs(sinon.match.any)
            .returns(Promise.resolve(profile));

        return repositoryService.update(1, profile)
            .then((result) => {
                expect(result).to.be.eq(profile);
                sinon.assert.calledOnce(updateStub);
                sinon.assert.calledOnce(findStub);
            })
            .catch((error) => { throw new AssertionError(`Shouldn't be here! ${error}`); });
    });
    it("updateFails", function () {
        const repository = <Repository<Profile>> {
            update(criteria: FindConditions<Profile>, partialEntity: QueryDeepPartialEntity<Profile>): Promise<UpdateResult> {
                return Promise.reject('error');
            }
        };
        const repositoryService: TypeormProfileRepositoryService = new TypeormProfileRepositoryService(repository);
        const profile = <Profile>{};

        return repositoryService.update(1, profile)
            .then((result) => { throw new AssertionError(`Shouldn't be here!`); })
            .catch((error) => {
                expect(error).to.be.eq('error');
                return Promise.resolve();
            });
    });
});