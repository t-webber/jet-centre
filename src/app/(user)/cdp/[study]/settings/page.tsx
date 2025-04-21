import { StudyParams } from '@/routes';
import { StudyInfosParamsEditor } from './infos/form';
import { getStudyInfos } from './infos/action';
import { ErrorPage } from '@/components/error';
import { getStudyProceedings } from './proceedings/action';
import { StudyProceedingsParamsEditor } from './proceedings/form';

export default async function StudySettingsPage({ params }: StudyParams) {
    const { study } = await params;
    const studyInfos = await getStudyInfos(study);
    const studyProceedings = await getStudyProceedings(study);
    return studyInfos && studyProceedings ? (
        <div className="flex flex-col gap-main">
            <StudyInfosParamsEditor studyCode={study} {...studyInfos} />
            <StudyProceedingsParamsEditor studyCode={study} {...studyProceedings} />
        </div>
    ) : studyInfos || studyProceedings ? (
        <ErrorPage title="Erreur lors du chargement de l'étude">
            <p>Merci de rafraîchir la page ou de faire un ticket SOS.</p>
        </ErrorPage>
    ) : (
        <ErrorPage title="Étude inexistante">
            <p>Vous avez essayé d'accéder à une étude qui n'existe pas.</p>
            <p>Merci de rafraîchir la page ou de faire un ticket SOS.</p>
        </ErrorPage>
    );
}
