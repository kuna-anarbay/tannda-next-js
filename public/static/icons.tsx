interface IconsProps {
    className?: string;
}

interface IconProps {
    className?: string;
    iconName: string;
}

const Icon = (props: IconProps) => <i className={`${props.iconName} ${props.className}`} />

export const ChevronUp = (props: IconsProps = { className: ""}) => <Icon iconName={"fas fa-chevron-up"} className={props.className} /> ;

export const ChevronDown = (props: IconsProps = { className: ""}) => <Icon iconName={"fas fa-chevron-down"} className={props.className} />;