import 'reflect-metadata'
import { describe, it } from 'mocha';
import { expect, AssertionError } from 'chai';
import * as sinon from 'sinon';
import {ProfileRepositoryService} from "../../src/service/api/profile-repository.service";
import {CreateProfileBusiness} from "../../src/business/status/create-profile.business";
import {Profile} from "../../src/model/profile";

describe("CreateProfileBusiness", function () {
    it("createProfileSuccess", function () {
        const profileRepoService = <ProfileRepositoryService>{ persist(profile: Profile): Promise<Profile> { return Promise.reject('my bad'); }};
        const createProfileBusiness = new CreateProfileBusiness(profileRepoService);
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
        const createProfileBusiness = new CreateProfileBusiness(profileRepoService);
        const profile = <Profile>{};

        const createStub = sinon.stub(profileRepoService, "persist")
            .withArgs(sinon.match.same(profile))
            .returns(Promise.reject('error'));

        return createProfileBusiness.create(profile)
            .then((profile) => { throw new AssertionError("Shouldn't be here"); })
            .catch((error) => {
                expect(error).to.be.eq('error');
                sinon.assert.calledOnce(createStub);
                return Promise.resolve();
            });
    });
});