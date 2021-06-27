import {images} from "../util/landing-images";

export default function AboutView() {
    return (
        <div className={'w-full'}>
            <div className={'max-w-250 mx-auto py-16 flex flex-row justify-between items-center'}>
                <div className={'w-480/1000 bg-landing-turquoise h-120 w-120 rounded-full relative'}>
                    <img className={'landing-about-img'} src={images.aboutUs}/>
                    <img className={'landing-about-img2'} src={images.aboutUs2}/>
                </div>
                <div className={'w-444/1000'}>
                    <h5 className={'uppercase text-footnote font-bold text-primary'}>About us</h5>
                    <h1 className={'text-largeTitle2 font-extrabold pb-8'}>Headline</h1>
                    <p className={'text-title3 font-normal'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non. Non commodo volutpat, pharetra, vel.</p>
                </div>
            </div>
        </div>
    )
}
