import React, {useState} from "react";

const FormItemType = "text" | "email" | "phone" | "number" | "textarea" | "select";

export default function FormItem({label, defaultValue = "" }) {
    const [value, changeValue] = useState(defaultValue);

    return (
        <label className="block mt-2">
            <span className="text-gray-700">
                {label}
            </span>
            <input onChange={(e) => changeValue(e.target.value)}
                   value={value} type="text"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                   placeholder={label}/>
        </label>
    )
}