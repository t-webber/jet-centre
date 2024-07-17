import { ReactNode } from 'react';

type EltItem =
    | {
          type: 'question';
          question: string;
      }
    | {
          type: 'select';
          question: string;
          options: (string | number)[];
      }
    | {
          type: 'check';
          question: string;
      }
    | {
          type: 'title';
          title: string;
      }
    | {
          type: 'text';
          text: string;
      };

interface Elt {
    title: string;
    content: EltItem[];
}

const assigneeInterviewTemplate: Elt[] = [
    {
        title: "Début de l'entretien",
        content: [
            { type: 'text', text: 'Se présenter' },
            {
                type: 'text',
                text: 'Donner le contexte: "On va te faire passer un entretien pour évaluer tes compétences sur la mission à laquelle tu as candidaté. Ça devrait durer une vingtaine de minute. N’hésite pas à poser toutes les questions que tu as pour que tout soit bien clair !"',
            },
            {
                type: 'text',
                text: '"On va commencer par passer en revue tes informations pour s\'assurer que tout est correct"',
            },
        ],
    },
    {
        title: "Question pour mettre à l'aise",
        content: [
            { type: 'question', question: 'Nom' },
            { type: 'question', question: 'Prénom' },
            { type: 'question', question: 'Moins de 27 ans (obligatoire)\u00A0?' },
            {
                type: 'select',
                question: 'Promo',
                options: Array.from(Array(7)).map((_, i) => 2020 + i),
            },
        ],
    },
    {
        title: "Histore de l'intervenant",
        content: [
            {
                type: 'question',
                question:
                    "A combien d'études l'intervenant.e a postulé\u00A0? (Nombre de fois que la personne à répondu à un MRI, cette étude exclue)",
            },
            {
                type: 'question',
                question: 'Quand a eu lieu votre dernier entretien\u00A0?',
            },
            {
                type: 'question',
                question: "Combien l'intervenant.e a déjà fait d'études\u00A0?",
            },
            { type: 'select', question: 'Ancient JET\u00A0?', options: ['Oui', 'Non'] },
        ],
    },
    {
        title: 'Explication de la mission',
        content: [
            {
                type: 'text',
                text: 'Revenir plus en détail sur le contexte de la mission:\n - Qui est le client (PME/Grosse entreprise; Domaine)\n - But de la mission\u00A0?\n - Comment semble fonctioner le client\n? (Réactif, directif, à rassurer, vague)\n - Travail intervenant solo ou en groupe\u00A0?\n - Timeline\u00A0?',
            },
            {
                type: 'select',
                question:
                    "Est-ce que l'intervenant.e est disponible\u00A0? (N'est pas disponible si déjà sur une étude ou chargé.e en travail à l'école ). Bien préciser par rapport aux points réguliers avec le client. Parler des deadlines.",
                options: ['Oui', 'Non'],
            },
            {
                type: 'text',
                text: 'Expliquer en quoi consiste précisément la mission. ATTENTION, ne surtout pas dire comment on pense réaliser la mission (sauf si explicité par le client). Il faut laisser réfléchir et ne pas influencer.',
            },
        ],
    },
    {
        title: "Profil de l'intervenant",
        content: [
            {
                type: 'check',
                question: "Demander su l'intervenant à des questions jusque là",
            },
            {
                type: 'question',
                question:
                    "Comment l'intervenant pense-t-il réaliser cette étude\u00A0? (Noter les points d'étapes, les compétences, la structure de la réponse, etc).",
            },
            {
                type: 'question',
                question:
                    "Quelle filière/master, cours ou projet suivis par l'intervenant.e seraient utile pour cette étude\u00A0?",
            },
        ],
    },
    {
        title: "Évaluation de compétences\u00A0: Méthode STAR de l'intervenant",
        content: [
            {
                type: 'text',
                text: "Quel projet similaire à cette mission l'intervenant a-t-il déjà réalisé",
            },
            {
                type: 'question',
                question: 'Situation et contexte général du projet',
            },
            {
                type: 'question',
                question: 'Tâches et situations spécifiques',
            },
            {
                type: 'question',
                question: 'Action et contribution individuelle',
            },
            {
                type: 'question',
                question:
                    "Résultats et objectifs accomplis (retour d'expérience, ce qu'il/elle en a retiré...)",
            },
        ],
    },
    {
        title: "Fin de l'entretien",
        content: [
            {
                type: 'question',
                question:
                    "Quelles sont les motivations de l'intervenant\u00A0? (rétribution, apprentissage ...)\u00A0?",
            },
            {
                type: 'question',
                question:
                    'Quel type de chef de projet il/elle veut\u00A0? (directif...) et comment vous serez avec lui/elle',
            },
            {
                type: 'check',
                question:
                    "Expliquer à l'intervenant comment se déroule une mission à la JE (sélection d'intervenant, réunion tripartite, signature CE/RM, points réguliers avec le client, remise livrable...).",
            },
            { type: 'check', question: 'Est-ce que tu as des questions pour la suite\u00A0?' },
            { type: 'check', question: 'Dire que pas de lien direct avec le client' },
            {
                type: 'check',
                question: 'Expliquer combien il/elle sera payé, et combien y a de cotisations',
            },
            {
                type: 'check',
                question:
                    'Dire que la rétribution ne doit pas être considérée comme source de revenu principale',
            },
            { type: 'check', question: 'Parler des 3 mois de garantie' },
            {
                type: 'check',
                question: "Dire quand vous lui donnerez la réponse (s'il/elle est pris.e)",
            },
        ],
    },
];

export function Interview({ editable }: { editable?: boolean }) {
    return (
        <div>
            {assigneeInterviewTemplate.map((section, i) => (
                <div key={i}>
                    <h3></h3>
                </div>
            ))}
        </div>
    );
}
