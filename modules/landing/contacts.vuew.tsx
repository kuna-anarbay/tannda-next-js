import r from "../util/r";
import Link from "next/link";

export default function ContactsView() {
    return (
        <div className={'h-18 bg-landing-black w-full'}>
            <div className={'h-full max-w-250 mx-auto flex flex-row items-center justify-between'}>
                <Link href={"/"}>
                    <img className={"h-8 cursor-pointer"} src={r.image.logoIconText.val}
                                      alt={r.image.logoIconText.alt}/>
                </Link>
                <p className={'text-footnote text-white'}>© 2020 Landify UI Kit. All rights reserved</p>
                <div className={'flex flex-row'}>
                    <a href={'https://instagram.com'}><img className={'mx-2 cursor-pointer'} src={'/icons/landing/instagram-icon.svg'}/></a>
                    <a href={'https://dribbble.com'}><img className={'mx-2 cursor-pointer'} src={'/icons/landing/dribbble-icon.svg'}/></a>
                    <a href={'https://twitter.com'}><img className={'mx-2 cursor-pointer'} src={'/icons/landing/twitter-icon.svg'}/></a>
                    <a href={'https://youtube.com'}><img className={'mx-2 cursor-pointer'}src={'/icons/landing/youtube-icon.svg'}/></a>
                </div>
            </div>
        </div>
    )
}
