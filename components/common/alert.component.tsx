import React, {useState} from "react";

interface AlertProps {
    initialVisible: boolean;
    type: "error" | "success" | "info";
    title: string;
    text: string;
}

export default function Alert(props: AlertProps = {initialVisible: true, type: "info", text: "", title: ""}) {
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
                className={`fixed z-50 shadow-md py-4 px-6 rounded-md text-${color}-900 bg-${color}-50 bottom-8 left-4 right-4 md:bottom-16 md:left-16 md:right-16`}>
                <div className="flex space-x-4">
                    <div className="flex-grow">
                        <h5 className={`text-${color}-900 font-medium`}>
                            {props.title}
                        </h5>
                        <p className={`text-${color}-500 text-sm`}>
                            {props.text}
                        </p>
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