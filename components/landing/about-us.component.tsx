import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function AboutUs() {
    const {t} = useTranslation();
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid md:grid-flow-col gap-8 md:gap-12">
                <div className="md:col-span-2">
                    <div className="rounded-xl shadow-md">
                        <img
                            src={"https://tannda-storage.s3.eu-central-1.amazonaws.com/tannda/web/landing-product-ru.png"}
                            alt={"Tañda header image"}/>
                    </div>
                </div>
                <div className="flex flex-wrap content-center w-full md:col-span-3">
                    <div>
                        <h2 className="text-base text-main font-semibold tracking-wide uppercase">
                            About us
                        </h2>
                        <h1 className="mt-2 text-4xl font-bold">
                            <div>
                                On a mission to empower businesses
                            </div>
                        </h1>
                    </div>
                    <h2 className="text-lg text-gray-500 mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor iaculis convallis.
                        Aenean a venenatis enim. Morbi tincidunt pretium enim. Curabitur pharetra, neque in varius
                        dapibus, ante nunc dignissim mauris, sed placerat tortor justo eget est. In non convallis
                        metus. Cras a sem lectus. Nullam dapibus, quam id congue posuere, sem risus viverra eros,
                        sit amet gravida mi lectus nec lorem. Maecenas sit amet velit at velit blandit convallis.

                        Nulla ut elit in sapien pulvinar iaculis. Vestibulum ante ipsum primis in faucibus orci
                        luctus et ultrices posuere cubilia curae; Curabitur malesuada mi nec nulla luctus, nec
                        condimentum mauris gravida. Mauris vel mi enim. Vivamus fermentum nunc accumsan sagittis
                        finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea
                        dictumst. Nulla facilisi. Nam eget diam eu metus eleifend faucibus ac vitae augue.
                    </h2>
                </div>
            </div>
        </div>
    )
}