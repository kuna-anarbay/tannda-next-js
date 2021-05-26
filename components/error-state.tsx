import {getIcon, IconType} from "../util/icon";

export default function ErrorState() {

    return (
        <div className={"border border-divider rounded-md p-6 md:p-8 text-center my-4 space-y-3"}>
            <div className={"flex justify-center"}>
                { getIcon(IconType.Warning, "text-6xl text-danger")}
            </div>

            <div>
                <h4 className={"text-title3 md:text-title2 font-medium mt-3"}>
                    Blankslate heading
                </h4>
                <p className={"text-footnote text-label-light"}>
                    Use it to provide information when no dynamic content exists.
                </p>
            </div>

            <button type={"submit"} className={"btn btn-sm btn-primary"}>
                Some action
            </button>
        </div>
    )
}
