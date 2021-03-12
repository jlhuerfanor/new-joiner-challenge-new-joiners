import 'reflect-metadata'
import { describe, it } from 'mocha';
import { expect, AssertionError } from 'chai';
import * as sinon from 'sinon';
import {ProfileRepositoryService} from "../../src/service/api/profile-repository.service";
import {CreateProfileBusiness} from "../../src/business/profile/create-profile.business";
import {Profile} from "../../src/model/profile";
import {ProfileQueryService} from "../../src/service/api/profile-query.service";
import {TypeormProfileQueryService} from "../../src/service/implementation/typeorm-profile-query.service";

describe("CreateProfileBusiness", function () {
    it("createProfileSuccess", function () {
        const profileRepoService = <ProfileRepositoryService>{ persist(profile: Profile): Promise<Profile> { return Promise.reject('my bad'); }};
        const profileQueryService = <ProfileQueryService>{
            checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void> { return Promise.resolve(); }
        };
        const createProfileBusiness = new CreateProfileBusiness(profileRepoService, profileQueryService);
        const profile = <Profile>{};

        const createStub = sinon.stub(profileRepoService, "persist")
            .withArgs(sinon.match.same(profile))
            .returns(Promise.resolve(profile));

        return createProfileBusiness.create(profile)
            .then((result) => {
                sinon.assert.calledOnce(createStub);
            })
            .catch((error) => { throw new AssertionError(`Shoudn't be here. ${error}`); });
    });
    it("createProfileError", function () {
        const profileRepoService = <ProfileRepositoryService>{ persist(profile: Profile): Promise<Profile> { return Promise.reject(); }};
        const profileQueryService = <ProfileQueryService>{
            checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void> { return Promise.reject(TypeormProfileQueryService.ERROR_DUPLICATED_ID_NUMBER); }
        };
        const createProfileBusiness = new CreateProfileBusiness(profileRepoService, profileQueryService);
        const profile = <Profile>{};

        return createProfileBusiness.create(profile)
            .then((profile) => { throw new AssertionError("Shouldn't be here"); })
            .catch((error) => {
                expect(error).to.be.eq(TypeormProfileQueryService.ERROR_DUPLICATED_ID_NUMBER);
                return Promise.resolve();
            });
    });
});