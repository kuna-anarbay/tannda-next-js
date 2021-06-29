import {GetIcon, IconType} from "../util/icon";

export default function FeaturesComponent() {

    return (
        <div className={"container bg-background mx-auto px-4 py-24 z-40"}>
            <div>
                <h2 className={"text-title1 text-center font-bold md:text-largeTitle"}>
                    10,000+ people love us
                </h2>
                <p className={"text-base text-center mt-3 text-label-light"}>
                    These companies release their own versions of the operating <br /> systems with minor changes, and yet always.
                </p>
                <div className={"grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 mt-6"}>
                    { [1, 2, 3, 4, 5].map(() => (
                        <div className={"flex items-center space-x-4"}>
                            <div className={"rounded-md border border-border p-3"}>
                                {GetIcon(IconType.Menu, "text-title3 text-primary")}
                            </div>
                            <div className={"space-y-1"}>
                                <h4 className={"text-base font-medium"}>
                                    Set instant meeting
                                </h4>
                                <p className={"text-footnote text-label-light"}>
                                    Time is the most precious thing you have when bootstrapping. You can't take time to ponder on design…
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
