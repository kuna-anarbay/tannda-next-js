import NavbarDesktop from "./navbar.desktop";
import NavbarMobile from "./navbar.mobile";
import {useRouter} from "next/router";
import CategoryAction from "../category/category.action";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import LocalDatabase from "../../services/localDatabase";
import Category from "../category/category.entity";

export default function Navbar() {
    const dispatch = useDispatch();
    const categoryAction = new CategoryAction();

    useEffect(() => {
        getCategories();
    }, []);

    function getCategories() {
        dispatch(categoryAction.getCategories()).then(res => {
            const result = res.data as Category[];
            if (result) {
                LocalDatabase.instance.setCategories(result);
            }
        });
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
