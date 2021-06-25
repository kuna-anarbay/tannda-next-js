const prices = [
    {
        header: 'Стандарт',
        description: 'Все необходимое, чтобы начать новый бизнес',
        price: '12 000 ₸ / месяц',
        features: ['Advanced Segmentation', 'Comparative Reporting', 'Customer Journey Builder + Branching Points']
    },
    {
        header: 'Стандарт',
        description: 'Все необходимое, чтобы начать новый бизнес',
        price: '12 000 ₸ / месяц',
        features: ['Advanced Segmentation', 'Comparative Reporting', 'Customer Journey Builder + Branching Points', 'Advanced Segmentation', 'Comparative Reporting', 'Customer Journey Builder + Branching Points']
    },
    {
        header: 'Стандарт',
        description: 'Все необходимое, чтобы начать новый бизнес',
        price: '12 000 ₸ / месяц',
        features: ['Advanced Segmentation', 'Comparative Reporting', 'Customer Journey Builder + Branching Points', 'Advanced Segmentation', 'Comparative Reporting', 'Customer Journey Builder + Branching Points', 'Advanced Segmentation', 'Comparative Reporting', 'Customer Journey Builder + Branching Points']
    }
]

interface PriceProp {
    header: string,
    description: string,
    price: string,
    features: string[]
}

function PriceCard(props: PriceProp) {
    const {header, description, price, features} = props
    return (
        <div className={'w-32% border-0.5 rounded-md p-6 border-landing-white shadow-sm'}>
            <h5 className={'font-semibold text-title4'}>{header}</h5>
            <p className={'font-normal text-base text-landing-gray'}>{description}</p>
            <h4 className={'text-title2 font-medium mt-2'}>{price}</h4>
            <div className={'border-t border-landing-white mt-4 pt-5'}>
                <h5 className={'uppercase font-normal text-footnote'}>Что включено</h5>
                <div className={'mt-4'}>
                    {features.map(feature =>
                        <div className={'flex items-start mt-3'}><img className={'mr-2.5'} src={'/icons/landing/check-circle.svg'}/> <p>{feature}</p></div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default function PriceView() {
    return (
        <div className={'w-full'}>
            <div className={'p-16 max-w-300 mx-auto flex flex-col items-center'}>
                <div className={'text-center max-w-135 mb-12'}>
                    <h1 className={'text-header font-extrabold'}>Tailor-made features</h1>
                    <p className={'font-normal text-lg'}>Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.</p>
                </div>
                <div className={'flex flex-row justify-between items-start'}>
                    {prices.map(price => <PriceCard header={price.header} description={price.description} price={price.price} features={price.features}/>)}
                </div>
            </div>
        </div>
    )
}
