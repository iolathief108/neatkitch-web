import {useSnapshot} from 'valtio';
import frontState from '../../states/front';
import Link from 'next/link';


export function Dod() {
    const {dods} = useSnapshot(frontState);

    return (
        <div className={'home-dod pb-4 px-4'}>
            <h2 className={'pt-4 pb-2 fw-bold'}>Deals of the day!</h2>
            <div className={'content mt-3 row'}>
                {
                    dods?.map((dod, index) => {

                        return (
                            <Link href={dod?.id ? '/search?pin=' + dod.id : '/search'}  key={index}>
                                <a key={index} className={'dod-item mb-4 col-12 col-sm-6 col-lg-3'}>
                                    <div className={'image-wrapper'}>
                                        <img className={'rounded-2 shadow'} src={dod.imageUrl} alt="Deals of the day!"/>
                                    </div>
                                </a>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}
