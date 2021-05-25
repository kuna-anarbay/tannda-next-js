import {useState} from "react";
import {ContactTypeEnum} from "../util/contact-type.enum";
import {IMaskInput} from 'react-imask';
import {getIcon, IconType} from "../../util/icon";
import Company from "./company.entity";
import {useDispatch} from "react-redux";
import actions from "./company-info.action";
import {useQuery} from "@redux-requests/react";

interface CompanyInfoProps {
    company: Company;
}

export default function CompanyInfoComponent(props: CompanyInfoProps) {
    const {company} = props;
    const {loading} = useQuery({type: actions.updateCompany});
    const dispatch = useDispatch();
    const [phones, setPhones] = useState(company.phones);

    const addPhone = () => {
        setPhones([...phones, {
            type: ContactTypeEnum.PHONE,
            val: ""
        }]);
    }

    const removePhone = (index: number) => {
        setPhones(phones.filter((phone, i) => i !== index));
    }

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <div className={"p-4 md:p-6 w-full md:w-2/5"}>
            <div>
                <h2 className={"text-title1 font-semibold"}>
                    Company info
                </h2>
            </div>
            <form onSubmit={handleSubmit} className={"space-y-4 py-4"}>
                <div>
                    <h3 className={"text-title3 font-medium"}>
                        General
                    </h3>
                    <div className={"flex items-center space-x-6 mt-2"}>
                        <img className={"rounded-md h-30 w-30"}
                             src={company.avatar}/>
                        <button
                            type={"button"}
                            className={"rounded-md text-footnote border border-primary py-1.5 px-5 text-primary hover:bg-primary hover:text-white"}>
                            Upload
                        </button>
                    </div>
                    <p className={"mt-3 small-caps text-footnote text-label-light"}>
                        общая информация
                    </p>
                    <div className={"mt-2"}>
                        <label className={"block text-caption1 "}>
                            Название центра
                        </label>
                        <input name={"name"} defaultValue={company.name} placeholder={"Название центра"}
                               className="input-text"/>
                    </div>
                </div>
                <div className={"bg-divider w-full h-0.25"}/>
                <div>
                    <h3 className={"text-title3 font-medium"}>
                        Контактная информация
                    </h3>
                    <div className={"mt-3 flex justify-between items-center"}>
                        <p className={"small-caps text-footnote text-label-light"}>
                            телефонные номера
                        </p>
                        <button type={"button"} onClick={() => addPhone()} className={"text-caption1 text-primary"}>
                            + Add contact
                        </button>
                    </div>
                    {phones.map((phone, index) => (
                        <div className={"relative"}>
                            <div className={"mt-2 input-group"}>
                                <IMaskInput mask={"+{7} 000 000 00 00"}
                                            placeholder={"Phone number"}/>
                                <input placeholder={"Comments"}/>
                            </div>
                            <button type={"button"} onClick={() => removePhone(index)}
                                    className={"absolute top-2 right-3 p-0.5 border rounded-full border-divider-light"}>
                                {getIcon(IconType.XMark, "text-caption1")}
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type={"submit"}
                    className={"px-6 py-1.5 rounded-md text-footnote font-medium text-white bg-primary hover:primary-selected"}>
                    Submit
                </button>
            </form>
        </div>
    )
}
