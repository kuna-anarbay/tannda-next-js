import {features} from './features.data'

interface FeatureProps{
    header: string,
    description: string,
    icon: string,
}

function Feature(props: FeatureProps){
    const {header, description, icon} = props;
    return (
        <div className={'w-350/1200 flex flex-col items-center mb-16'}>
            <img className={'mb-6'} src={icon}/>
            <h3>{header}</h3>
            <p className={'text-center'}>{description}</p>
        </div>
    )
}

export default function FeaturesView() {
    return (
        <div className={'w-full'}>
            <div className={'pt-16 max-w-300 mx-auto flex flex-col items-center'}>
                <div className={'text-center max-w-135 mb-12'}>
                    <h1 className={'text-header font-extrabold'}>Tailor-made features</h1>
                    <p className={'font-normal text-lg'}>Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.</p>
                </div>
                <div className={'flex flex-wrap justify-between'}>
                    {
                        features.map(feature => <Feature header={feature.header} icon={feature.icon} description={feature.description}/>)
                    }
                </div>
            </div>
        </div>
    )
}
