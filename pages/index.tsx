import React from "react";
import HeaderView from "../modules/layout/header.view";
import HeroView from "../modules/landing/hero.view";
import FeatureBlocksView from "../modules/landing/feature-blocks.view";
import FeaturesView from "../modules/landing/features.view";

export default function HomePage() {

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <main className="flex-grow">
                <HeroView/>
                <FeaturesView/>
                <FeatureBlocksView/>

            {/*    <Testimonials/>*/}
            {/*    <Newsletter/>*/}
            </main>
        </div>
    )
}
