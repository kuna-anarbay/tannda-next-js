import HeaderView from "./header.view";
import AboutView from "./about.view";
import FeaturesView from "./features.view";
import PriceView from "./price.view";
import ContactsView from "./contacts.vuew";

export default function LandingController(){
    return (
        <>
            <HeaderView/>
            <AboutView/>
            <FeaturesView/>
            <PriceView/>
            <ContactsView/>
        </>
    )
}
