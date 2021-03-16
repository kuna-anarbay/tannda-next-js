import {NetworkManager} from "./network-manager";
import {BecomePartner} from "../../models/BecomePartner";
import {GenericRequest} from "../redux/generic.request";
import {authConstants} from "../redux/constants/auth.constants";


export class AuthApi extends NetworkManager {

    public static instance = new AuthApi();

    private constructor() {
        super();
    }

    public becomePartner = (req: Object) => GenericRequest(this.axiosInstance.post<BecomePartner>("auth/becomePartner", req), authConstants.BECOME_PARTNER);
}