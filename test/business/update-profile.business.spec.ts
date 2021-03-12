import 'reflect-metadata'
import { describe, it } from 'mocha';
import { expect, AssertionError } from 'chai';
import * as sinon from 'sinon';
import {ProfileRepositoryService} from "../../src/service/api/profile-repository.service";
import {Profile} from "../../src/model/profile";
import {UpdateProfileBusiness} from "../../src/business/profile/update-profile.business";
import {ProfileQueryService} from "../../src/service/api/profile-query.service";
import {TypeormProfileQueryService} from "../../src/service/implementation/typeorm-profile-query.service";

describe("UpdateProfileBusiness", function () {
    it("updateProfileSuccess", function () {
        const profileRepoService = <ProfileRepositoryService>{ update(profileId: number, profile: Profile): Promise<Profile> { return Promise.reject('my bad'); }};
        const profileQueryService = <ProfileQueryService>{
            checkIdNumberExists(idNumber: number): Promise<void> { return Promise.resolve(); },
            checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void> { return Promise.resolve(); }
        };
        const updateProfileBusiness = new UpdateProfileBusiness(profileRepoService, profileQueryService);
        const profile = <Profile>{};

        const createStub = sinon.stub(profileRepoService, "update")
            .withArgs(sinon.match.same(1), sinon.match.same(profile))
            .returns(Promise.resolve(profile));

        return updateProfileBusiness.update(1, profile)
            .then((result) => {
                sinon.assert.calledOnce(createStub);
            })
            .catch((error) => { throw new AssertionError(`Shoudn't be here. ${error}`); });
    });
    it("updateProfileErrorIdNumberDoesNotExists", function () {
        const profileRepoService = <ProfileRepositoryService>{ update(profileId: number, profile: Profile): Promise<Profile> { return Promise.reject(); }};
        const profileQueryService = <ProfileQueryService>{
            checkIdNumberExists(idNumber: number): Promise<void> { return Promise.reject(TypeormProfileQueryService.ERROR_PROFILE_NOT_FOUND_BY_ID_NUMBER); },
            checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void> { return Promise.resolve(); }
        };
        const updateProfileBusiness = new UpdateProfileBusiness(profileRepoService, profileQueryService);
        const profile = <Profile>{};

        return updateProfileBusiness.update(1, profile)
            .then((profile) => { throw new AssertionError("Shouldn't be here"); })
            .catch((error) => {
                expect(error).to.be.eq(TypeormProfileQueryService.ERROR_PROFILE_NOT_FOUND_BY_ID_NUMBER);
                return Promise.resolve();
            });
    });
    it("updateProfileErrorIdNumberDoesNotExists", function () {
        const profileRepoService = <ProfileRepositoryService>{ update(profileId: number, profile: Profile): Promise<Profile> { return Promise.reject(); }};
        const profileQueryService = <ProfileQueryService>{
            checkIdNumberExists(idNumber: number): Promise<void> { return Promise.resolve(); },
            checkIdNumberDoesNotExists(idNumber: number, exceptIdNumber?: number): Promise<void> { return Promise.reject(TypeormProfileQueryService.ERROR_DUPLICATED_ID_NUMBER); }
        };
        const updateProfileBusiness = new UpdateProfileBusiness(profileRepoService, profileQueryService);
        const profile = <Profile>{};

        const createStub = sinon.stub(profileRepoService, "update")
            .withArgs(sinon.match.same(1),  sinon.match.same(profile))
            .returns(Promise.reject('error'));

        return updateProfileBusiness.update(1, profile)
            .then((profile) => { throw new AssertionError("Shouldn't be here"); })
            .catch((error) => {
                expect(error).to.be.eq(TypeormProfileQueryService.ERROR_DUPLICATED_ID_NUMBER);
                return Promise.resolve();
            });
    });
});