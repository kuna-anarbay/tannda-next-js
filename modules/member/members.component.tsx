import CourseService from "../../services/course.service";
import {useEffect, useState} from "react";
import {Member} from "../../models/member";
import {useAppData} from "../app/app-data-provider";
import Link from "next/link";

interface MembersComponentProps {
    id: number;
}

export default function MembersComponent(props: MembersComponentProps) {
    const {id} = props;
    const courseService = new CourseService();
    const {showError} = useAppData();
    const [members, setMembers] = useState(Array<Member>());


    useEffect(() => {
        getMembers();
    }, [])

    const getMembers = async () => {
        try {
            const members = await courseService.getMembers(props.id);
            setMembers(members);
        } catch (e) {
            showError(e.message);
        }
    }

    return (
        <div>
            <div className="py-6 space-y-4">
                <div className={"flex justify-between items-center"}>
                    <h3 className={"text-title3 font-medium md:text-title-2"}>
                        Members
                    </h3>
                    <button type={"button"} className={"btn btn-sm btn-outline"}>
                        Add member
                    </button>
                </div>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Full name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Note
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {members.map((member) => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={`/courses/${id}/members/${member.id}`}>
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={member.avatar}
                                                             alt=""/>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div
                                                            className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</div>
                                                        <div className="text-sm text-gray-500">{member.phone}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <a className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {member.status}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.note}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
