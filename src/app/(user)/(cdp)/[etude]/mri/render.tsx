import Image, { StaticImageData } from 'next/image';
import { getDifficulty, getDomain, getPay, lipsumMri } from './dev';

function ImageElt({ text, image }: { text: string; image: StaticImageData }) {
    return (
        <figure className="text-center space-y-2">
            <Image src={image} alt={'Image de ' + text} />
            <figcaption className="text-center">{text}</figcaption>
        </figure>
    );
}

export function RenderMRI({ etude }: { etude: string }) {
    const mri = lipsumMri;
    const h4cn = 'text-lg font-semibold py-4';
    return (
        <div className="space-y-4 flex flex-col">
            <h3 className="text-center text-xl font-semibold">{mri.title}</h3>
            <p className="text-center">{mri.intro}</p>
            <div className="flex">
                <ImageElt {...getDomain(mri.domain)} />
                <ImageElt {...getPay(mri.pay_under, mri.pay_over, mri.pay_level)} />
                <ImageElt {...getDifficulty(mri.difficulty)} />
            </div>
            <section>
                <h4 className={h4cn}>Description de la mission</h4>
                <p>{mri.description}</p>
            </section>
            <section>
                <h4 className={h4cn}>Compétences requises</h4>
                <p>{mri.skills}</p>
            </section>
            <section>
                <h4 className={h4cn}>Échéances</h4>
                <p>{mri.due_date}</p>
            </section>
        </div>
    );
}
