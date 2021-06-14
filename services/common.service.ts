import NetworkManager from "./http/network-manager";
import {LoginReq, LoginRes} from "../modules/auth/dto/login.dto";
import {URLPath} from "./http/URLPath";

export default class CommonService extends NetworkManager {

    public constructor() {
        super();
    }

    get = async <T>(url: string) => {
        return await this.instance.get<T>(url);
    }

}
