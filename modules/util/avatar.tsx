import {GetIcon, IconType} from "../../resources/icon";

interface AvatarProps {
    src: string | null | undefined;
    className: string | null;
}

export default function Avatar(props: AvatarProps) {
    const {src, className} = props;

    return src ? (
        <img src={src}
             className={"object-cover rounded-full w-8 h-8 border border-label-light border-opacity-10 " + className}
             alt={""}/>
    ) : (
        <div
            className={"rounded-full text-center flex items-center justify-center bg-primary w-8 h-8 border border-label-light border-opacity-10 " + className}>
            {GetIcon(IconType.User, "text-base text-background")}
        </div>
    );
}
