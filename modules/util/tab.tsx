interface TabProps {
    tabs: string[];
    selectedTab: number;
    selectTab: (number) => void;
}

export default function Tab(props: TabProps) {
    const {tabs, selectedTab, selectTab} = props;

    return (
        <div className={"tab"}>
            <div className={"tab-border"}/>
            <div className={"tab-content px-4"}>
                {tabs.map((tab, index) => (
                    <div onClick={() => selectTab(index)}
                         className={"tab-item " + (selectedTab === index ? "active" : "")}>
                        <p className={"tab-item-title"}>
                            {tab}
                        </p>
                        <div className={"tab-item-border"}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
