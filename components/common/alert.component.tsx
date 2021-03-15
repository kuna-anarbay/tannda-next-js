import React, {useState} from "react";

interface AlertProps {
    initialVisible: boolean;
    type: "error" | "success" | "info";
    text: string;
}

export default function Alert(props: AlertProps = { initialVisible: true, type: "info", text: ""}) {
    const [visible, hide] = useState(props.initialVisible);

    let color: string;
    switch (props.type) {
        case "error":
            color = "red";
            break;
        case "info":
            color = "blue";
            break;
        case "success":
            color = "green";
            break;
    }

    if (visible) {
        return (
            <div
                className={`fixed py-4 px-6 rounded-md text-${color}-900 bg-${color}-50 bottom-8 left-4 right-4 md:bottom-16 md:left-16 md:right-16`}>
                <div className="flex">
                    <div className="flex-grow">
                        {props.text}
                    </div>
                    <div className="flex-none w-4">
                        <button onClick={() => hide(false)} type="button">
                            <i className="fas fa-times"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}