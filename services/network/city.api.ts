import {ApprovalStatus} from "../../models/ApprovalStatus";
import {City} from "../../models/City";
import {Page} from "../../models/Page";
import {NetworkManager} from "./network-manager";
import {GenericRequest} from "../../store/generic.request";
import {cityConstants} from "../../store/constants/city.constants";

export class CityApi extends NetworkManager {

    public static instance = new CityApi();

    private constructor() {
        super();
    }

    public getCities = (approvalStatus: ApprovalStatus | null) => GenericRequest(this.axiosInstance.get<Page<City>>("cities", {params: {approvalStatus: approvalStatus}}), cityConstants.GET_CITIES)
    public createCity = (req: City) => GenericRequest(this.axiosInstance.post<City>("cities", req), cityConstants.CREATE_CITY)
    public deleteCity = (id: number) => GenericRequest(this.axiosInstance.delete(`cities/${id}`), cityConstants.DELETE_CITY)

}