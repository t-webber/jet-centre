'use client';

import { ManyComboBox, SingleCombobox } from '@/components/meta-components/combobox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState, RefAttributes } from 'react';
import { COMPANY_SIZES, CompanyData, StudyData } from './contants';
import { Input, InputProps } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { addRemoveKey, DeletableItemList } from '@/components/selectors';

export function AdminSelection({ admins, dbAdmins }: { admins: string[]; dbAdmins: string[] }) {
    const [uiAdmins, setAdmins] = useState<string[]>(dbAdmins);

    return (
        <>
            <ManyComboBox
                items={admins}
                addRemoveKey={(key) => addRemoveKey(key, uiAdmins, setAdmins)}
                selectedKeys={uiAdmins}
                emptyMessage="Personne à TE de ce nom..."
                title="Ajouter un CDP"
                placeholder="Prénom du CDP"
            />
            <Separator primary />
            {uiAdmins.length === 0 ? (
                <p className="text-center w-full">Aucun CDP sélectionné.</p>
            ) : (
                <DeletableItemList
                    items={uiAdmins}
                    deleteItem={(admin) => addRemoveKey(admin, uiAdmins, setAdmins)}
                />
            )}
        </>
    );
}

function NamedInput({
    name,
    ...props
}: { name?: string } & InputProps & RefAttributes<HTMLInputElement>) {
    return (
        <div>
            {name && <p>{name}</p>}
            <Input {...props} />
        </div>
    );
}

export function StudyParams({ studyData, admins }: { studyData?: StudyData; admins: string[] }) {
    const [ref, setRef] = useState(studyData?.ref_suivi || null);

    return (
        <>
            <SingleCombobox
                items={admins}
                selectKey={(admin) => setRef(admin)}
                currentKey={ref}
                emptyMessage="Personne à TE de ce nom..."
                title={ref || "Référent d'étude"}
                placeholder="Prénom du référent"
            />
            <span className="flex items-center space-x-2">
                <p>CC ?</p>
                <Checkbox defaultChecked={studyData?.cc} />
            </span>
            <NamedInput type="text" name="Nom de l'étude" defaultValue={studyData?.name} />
            <NamedInput type="text" name="Durée estimée" defaultValue={studyData?.length} />
            <NamedInput type="date" name="Deadline pré-étude" className="w-full text-white" />
            <NamedInput type="number" name="Nombre d'intervenant" min={0} />
        </>
    );
}

export function ComapnySelector({
    company,
    dbDomains
}: {
    company?: CompanyData;
    dbDomains: string[];
}) {
    const [size, setSize] = useState(company?.size || null);
    const [currentDomains, setDomains] = useState(company?.domains || []);

    return (
        <>
            <NamedInput name="Nom de l'entreprise" type="text" />
            <SingleCombobox
                items={COMPANY_SIZES}
                currentKey={size}
                selectKey={(k) => setSize(k as (typeof COMPANY_SIZES)[number])}
                placeholder="Choisir la taille"
                emptyMessage="Cette taille n'est pas reconnue"
                title="Taille de l'entreprise"
            />
            <ManyComboBox
                items={dbDomains}
                selectedKeys={currentDomains}
                addRemoveKey={(k) => addRemoveKey(k, currentDomains, setDomains)}
                title="Choisir des domains"
                emptyMessage="Aucun domain de ce nom"
                placeholder="Chercher un domaine"
            />
            <NamedInput name="CA (en k€)" type="number" min={0} />
            <Separator primary />
            <h4>Addresse</h4>
            <div className="w-full block">
                <div className="grid-cols-4 grid gap-2">
                    <NamedInput className="col-span-1" placeholder="N°" type="number" min={0} />
                    <NamedInput className="col-span-3" placeholder="Rue" type="text" />
                    <NamedInput className="col-span-4" placeholder="Ville" type="text" />
                    <NamedInput className="col-span-2" placeholder="Code postal" type="text" />
                    <NamedInput className="col-span-2" placeholder="Pays" type="text" />
                </div>
            </div>
        </>
    );
}
