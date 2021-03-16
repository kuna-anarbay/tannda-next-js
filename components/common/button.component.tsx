import React from "react";

interface ButtonProps {
    type: "primary";
    loading: boolean;
    title: string;
}

export default function Button(props: ButtonProps) {

    if (props.loading) {
        return (
            <button disabled={true} type="submit"
                    className="bg-gray-700 flex space-x-2.5 text-white px-6 py-2 rounded-lg md:px-8 hover:bg-gray-700">
                <i className="animate-spin fas fa-spinner"/>
                <div>
                    {props.title}
                </div>
            </button>
        )
    }
    return (
        <button disabled={false} type="submit"
                className="bg-main flex space-x-2.5 text-white px-6 py-2 rounded-lg md:px-8 hover:bg-primary-900">
            <div>
                {props.title}
            </div>
        </button>
    )
}