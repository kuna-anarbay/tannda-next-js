export default function HeaderComponent() {

    return (
        <div className={"h-80vh bg-background-secondary relative box-border"}>
            <div className={"py-20 container mx-auto px-4 "}>
                <h1 className={"text-largeTitle md:text-header font-bold text-center"}>
                    More than your <br /> regular email inbox
                </h1>
                <p className={"text-base text-label-light text-center mt-4"}>
                    We’ve helped over 25,000 individuals and companies <br/> to grow their business successfully.
                </p>
            </div>
            <div className={"landing-yellow-box"} />
            <div className={"landing-blue-box"} />
            <img className={"landing-product-demo"} src={"https://odoocdn.com/openerp_website/static/src/img/2018/crm/crm_screenshot_01.gif"} />
        </div>
    )
}
