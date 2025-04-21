import { StudyParams } from '@/routes';
import { StudyInfosParamsEditor } from './infos/form';
import { getStudyInfos } from './infos/action';
import { ErrorPage } from '@/components/error';
import { getStudyProceedings } from './proceedings/action';
import { StudyProceedingsParamsEditor } from './proceedings/form';
import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { Suspense } from 'react';

export default async function StudySettingsPage({ params }: StudyParams) {
    const { study } = await params;
    return (
        <div className="flex flex-col gap-main">
            <StudyInfosSuspenseBox title="Informations génériques" studyCode={study} />
            <StudyProceedingsSuspenseBox title="Détail des phases" studyCode={study} />
        </div>
    );
}

interface SuspenseBoxParams {
    title: string;
    studyCode: string;
}

async function StudyInfosSuspenseBox({ title, studyCode }: SuspenseBoxParams) {
    return (
        <Suspense fallback={<LoadingFallback title={title} />}>
            <StudyInfosBox title={title} studyCode={studyCode} />
        </Suspense>
    );
}

async function StudyInfosBox({ title, studyCode }: SuspenseBoxParams) {
    const studyInfos = await getStudyInfos(studyCode);
    return studyInfos ? (
        <StudyInfosParamsEditor title={title} studyCode={studyCode} {...studyInfos} />
    ) : (
        <Error />
    );
}
async function StudyProceedingsSuspenseBox({ title, studyCode }: SuspenseBoxParams) {
    return (
        <Suspense fallback={<LoadingFallback title={title} />}>
            <StudyProceedingsBox title={title} studyCode={studyCode} />
        </Suspense>
    );
}

async function StudyProceedingsBox({ title, studyCode }: SuspenseBoxParams) {
    const studyProceedings = await getStudyProceedings(studyCode);
    return studyProceedings ? (
        <StudyProceedingsParamsEditor title={title} studyCode={studyCode} {...studyProceedings} />
    ) : (
        <Error />
    );
}

function LoadingFallback({ title }: { title: string }) {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>{title}</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="h-full">
                    <p>Loading</p>
                </div>
            </BoxContent>
        </Box>
    );
}

function Error() {
    return (
        <ErrorPage title="Erreur lors du chargement de l'étude">
            <p>Merci de rafraîchir la page ou de faire un ticket SOS.</p>
        </ErrorPage>
    );
}
