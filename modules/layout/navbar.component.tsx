import NavbarDesktop from "./navbar.desktop";
import NavbarMobile from "./navbar.mobile";
import {useRouter} from "next/router";
import CategoryAction from "../category/category.action";
import AuthAction from "../auth/auth.action";
import {useToasts} from "react-toast-notifications";
import {useEffect} from "react";
import LocalDatabase from "../../services/localDatabase";

export default function Navbar() {
    const {addToast} = useToasts();
    const categoryAction = new CategoryAction();
    const authAction = new AuthAction();
    const {pathname} = useRouter();
    const {data} = categoryAction.getCategories();
    const refreshToken = authAction.refreshToken();

    if(data) {
        LocalDatabase.instance.setCategories(data);
    }

    if(refreshToken.data) {
        LocalDatabase.instance.setAccessToken(refreshToken.data);
    }

    useEffect(() => {
        if(!LocalDatabase.instance.getAccessToken()) {
            refreshToken.mutate();
        }
    }, []);


    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <div>
            <NavbarDesktop/>
            <NavbarMobile/>
        </div>
    );
}
