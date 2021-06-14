interface SpinnerProps {
    size?: "small" | "default";
}

export default function Spinner(props: SpinnerProps) {
    const {size} = props;

    switch (size) {
        case "small":
            return (
                <div className={"lds-spinner sm"}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            )
        default:
            return (
                <div className={"flex justify-center items-center pt-24"}>
                    <div className={"text-center space-y-1"}>
                        <div className={"lds-spinner"}>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                        <p className={"text-base font-medium"}>
                            Загрузка...
                        </p>
                    </div>
                </div>
            )
    }

}
