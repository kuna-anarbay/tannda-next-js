import NavbarDesktop from "./navbar.desktop";
import NavbarMobile from "./navbar.mobile";
import {useRouter} from "next/router";
import CategoryAction from "../category/category.action";
import {useEffect} from "react";
import LocalDatabase from "../../services/localDatabase";
import {useDispatchRequest} from "@redux-requests/react";

export default function Navbar() {
    const dispatch = useDispatchRequest();
    const categoryAction = new CategoryAction();

    useEffect(() => {
        getCategories();

    }, []);

    async function getCategories() {
        const {data} = await dispatch(categoryAction.getCategories());
        if (data) {
            LocalDatabase.instance.setCategories(data);
        }
    }

    async function refreshToken() {

    }

    const {pathname} = useRouter();
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
