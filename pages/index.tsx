import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/landing/header.component";
import Features from "../components/landing/features.component";
import CTA from "../components/landing/cta.component";
import Product from "../components/landing/product.component";
import AboutUs from "../components/landing/about-us.component";
import Contacts from "../components/landing/contacts.component";

export default function Home() {

  return (
    <div>
      <section>
        <Header />
        <AboutUs />
        <Features />
        <Product />
        <CTA />
        <Contacts />
      </section>
    </div>
  )
}
