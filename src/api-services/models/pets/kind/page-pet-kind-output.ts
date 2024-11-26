/* tslint:disable */
/* eslint-disable */
import {BaseEntity} from "/@/api-services/models/base/base-entity";
import {BasePageInput} from "/@/api-services/models/base/base-page-input";
import {PetKindOutPut} from "/@/api-services/models/pets/kind/pet-kind-output";

/**
 * 种类分页返回参
 * @export
 * @interface PagePetKindOutPut
 */
export interface PagePetKindOutPut extends BasePageInput<PetKindOutPut>{

}