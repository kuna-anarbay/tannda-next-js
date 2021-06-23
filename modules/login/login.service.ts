import NetworkManager from "../../services/http/network-manager";
import {LoginRequestDto, LoginResponseDto} from "./login.dto";
import {URLPath} from "../../services/http/URLPath";


export default class LoginService extends NetworkManager {
    
    login = async (body: LoginRequestDto) => {
        return await this.instance.post<LoginResponseDto>(URLPath.auth.login, body);
    }

}