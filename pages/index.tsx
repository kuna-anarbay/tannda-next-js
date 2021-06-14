import React from "react";
import HeaderComponent from "../modules/landing/header.component";
import FeaturesComponent from "../modules/landing/features.component";
import ContactsComponent from "../modules/landing/contacts.component";

export default function HomePage() {

    return (
        <div>
            <HeaderComponent/>
            <FeaturesComponent/>
            <ContactsComponent />
        </div>
    )
}
