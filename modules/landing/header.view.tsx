import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export default function HeaderView() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        }
    };
    return (
        <div className={'w-full bg-landing-header'}>
            <div className={'max-w-300 mx-auto py-30 flex flex-row justify-between'}>
                <div className={'w-642/1200'}>
                    <div className={'mb-9'}>
                        <h1 className={'text-header2 font-bold leading-h1 mb-4'}>A whole new vision of
                            <span className={'text-primary'}> your business</span></h1>
                        <p className={'text-xl font-medium text-landing-gray'}>Platform that presents your business, values and services in a whole new way. The best way for customers to find and apply to your courses. Platform that presents your business, values and services </p>
                    </div>
                    <div>
                        <h5 className={'uppercase font-medium text-footnote mb-3'}>
                            We are here to help you to:
                        </h5>
                        <div>
                            <Carousel
                                responsive={responsive}
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                arrows={false}
                                infinite={true}
                                itemClass={'bg-background rounded-xl mx-1.5 px-3 py-2 active'}>
                                <div>
                                    <h5 className={'text-landing-blue text-caption2'}>Student</h5>
                                    <p className={'text-sm'}>Submit quizzes</p>
                                </div>
                                <div>
                                    <h5 className={'text-landing-orange text-caption2'}>Manager</h5>
                                    <p className={'text-sm'}>Create courses</p>
                                </div>
                                <div>
                                    <h5 className={'text-landing-blue text-caption2'}>Student</h5>
                                    <p className={'text-sm'}>View grades</p>
                                </div>
                                <div>
                                    <h5 className={'text-landing-green text-caption2'}>Teacher</h5>
                                    <p className={'text-sm'}>Set performance</p>
                                </div>
                                <div>
                                    <h5 className={'text-landing-green text-caption2'}>Teacher</h5>
                                    <p className={'text-sm'}>Manage lessons</p>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className={'bg-background w-460/1200 px-7 py-9 rounded-lg shadow-md'}>
                    <h5 className={'text-title2 font-semibold'}>Become our partner</h5>
                    <p>Focus on your mission. Let us take care of everything else.</p>
                    <form>
                        <input className={'my-2'} placeholder={'Your center’s name'}/>
                        <input className={'my-2'} placeholder={'Your name'}/>
                        <input className={'my-2'} placeholder={'Phone number'}/>
                        <button className={'btn btn-primary my-2'}>Become a partner</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
