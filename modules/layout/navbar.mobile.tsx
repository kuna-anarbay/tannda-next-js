import r from "../util/r";

export default function NavbarMobile() {

    return (
        <div className={"h-12 relative md:hidden"}>
            <div
                className="bg-background h-12 fixed top-0 inset-x-0 z-40 border-b border-divider-light">
                <div className={"flex justify-between relative"}>
                    <div className={"flex items-center"}>

                    </div>
                    <div className={"absolute inset-0 flex items-center justify-center py-0.5"}>
                        <img className={"h-full"} src={r.image.logoSquare.val} alt={r.image.logoSquare.alt}/>
                    </div>
                    <div
                        className={"h-12 px-5 text-white text-footnote bg-primary flex items-center font-medium cursor-pointer hover:bg-primary-selected"}>
                        Become partner
                    </div>
                </div>
            </div>
        </div>
    )
}
