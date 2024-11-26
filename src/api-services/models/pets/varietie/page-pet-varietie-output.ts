/* tslint:disable */
/* eslint-disable */
import {BaseEntity} from "/@/api-services/models/base/base-entity";
import {BasePageInput} from "/@/api-services/models/base/base-page-input";
import {PetKindOutPut} from "/@/api-services/models/pets/kind/pet-kind-output";
import {EditSysPetVarietieInput} from "/@/api-services/models/pets/varietie/edit-pet-varietie-input";

/**
 * 品种分页返回参
 * @export
 * @interface PagePetVarietieOutPut
 */
export interface PagePetVarietieOutPut extends BasePageInput<PetKindOutPut>{

}