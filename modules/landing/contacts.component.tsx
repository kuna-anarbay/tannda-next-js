export default function ContactsComponent() {

    return (
        <div className={"bg-background-secondary"}>
            <div className={"container mx-auto px-4 py-12"}>
                <div className={"grid grid-cols-1 gap-6 md:grid-cols-2"}>
                    <div>

                    </div>
                    <div className={"rounded-lg bg-primary-extra-light flex items-center px-6 py-8"}>
                        <div>
                            <h4 className={"text-title3 font-semibold"}>
                                Contacts
                            </h4>
                            <ul className={"mt-2"}>
                                <li className={"text-footnote text-label-head"}>
                                    +7 706 670 8907
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
