import React, {useState} from "react";

interface AlertProps {
    initialVisible: boolean;
    type: "error" | "success" | "info";
    title: string;
    text: string;
}

export default function Alert(props: AlertProps = {initialVisible: true, type: "info", text: "", title: ""}) {
    const [visible, hide] = useState(props.initialVisible);

    if (visible) {
        let color: string;
        switch (props.type) {
            case "error":
                return (
                    <div
                        className="fixed z-50 bg-white shadow-md py-4 px-6 rounded-md text-red-900 bg-red-50 bottom-8 left-4 right-4 md:bottom-16 md:left-16 md:right-16">
                        <div className="flex space-x-4">
                            <div className="flex-grow">
                                <h5 className="text-red-900 font-medium">
                                    {props.title}
                                </h5>
                                <p className="text-red-500 text-sm">
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
                break;
            case "info":
                return (
                    <div
                        className="fixed z-50 bg-white shadow-md py-4 px-6 rounded-md text-blue-900 bg-blue-50 bottom-8 left-4 right-4 md:bottom-16 md:left-16 md:right-16">
                        <div className="flex space-x-4">
                            <div className="flex-grow">
                                <h5 className="text-blue-900 font-medium">
                                    {props.title}
                                </h5>
                                <p className="text-blue-500 text-sm">
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
                break;
            case "success":
                return (
                    <div
                        className="fixed z-50 bg-white shadow-md py-4 px-6 rounded-md text-green-900 bg-green-50 bottom-8 left-4 right-4 md:bottom-16 md:left-16 md:right-16">
                        <div className="flex space-x-4">
                            <div className="flex-grow">
                                <h5 className="text-green-900 font-medium">
                                    {props.title}
                                </h5>
                                <p className="text-green-500 text-sm">
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
                break;
        }
    }

    return null;
}