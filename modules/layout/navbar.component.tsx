import NavbarDesktop from "./navbar.desktop";
import NavbarMobile from "./navbar.mobile";
import {useRouter} from "next/router";

export default function Navbar() {
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
