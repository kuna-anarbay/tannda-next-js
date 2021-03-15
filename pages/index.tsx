import Header from "../components/landing/header.component";
import Features from "../components/landing/features.component";
import CTA from "../components/landing/cta.component";
import Product from "../components/landing/product.component";
import Contacts from "../components/landing/contacts.component";

export default function Home() {

    return (
        <div>
            <section>
                <Header/>
                <Features/>
                <Product/>
                <CTA/>
                <Contacts/>
            </section>
        </div>
    )
}
