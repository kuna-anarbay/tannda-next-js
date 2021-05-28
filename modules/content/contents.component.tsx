import SectionComponent from "./section.component";
import LessonComponent from "./lesson.component";
import Content from "./content.entity";
import {useEffect, useState} from "react";
import ContentAction from "./content.action";
import {useDispatch} from "react-redux";
import {Query} from "@redux-requests/react";
import {ContentType} from "../enum/content-type.enum";
import StateView from "../util/state-view";
import {IconType} from "../util/icon";

export interface ContentComponentProps {
    content: Content;
}

interface ContentsComponentProps {
    courseId: number;
}

export default function ContentsComponent(props: ContentsComponentProps) {
    const {courseId} = props;
    const contentAction = new ContentAction();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(contentAction.getContents(courseId));
    }, []);


    return (
        <div className={"content"}>
            <Query
                type={contentAction.getContents}
                loadingComponent={StateView}
                loadingComponentProps={{title: "Fetching content", icon: IconType.Warning}}
            >
                {
                    ({data}) => (
                        data.map(content => (
                            content.type === ContentType.SECTION ? <SectionComponent content={content}/> :
                                <LessonComponent content={content}/>
                        ))
                    )
                }
            </Query>
        </div>
    )
}