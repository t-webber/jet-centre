'use client';

import { ManyComboBox, SingleCombobox } from '@/components/meta-components/combobox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { StudyData } from './page';
import { Input, InputProps } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export function AdminSelection({ admins, dbAdmins }: { admins: string[]; dbAdmins: string[] }) {
    const [uiAdmins, setAdmins] = useState<string[]>(dbAdmins);
    const addRemoveAdmin = (admin: string) => {
        if (uiAdmins.includes(admin)) {
            setAdmins(uiAdmins.filter((a) => a !== admin));
        } else {
            setAdmins([...uiAdmins, admin]);
        }
    };

    return (
        <>
            <ManyComboBox
                items={admins}
                addRemoveKey={addRemoveAdmin}
                selectedKeys={uiAdmins}
                emptyMessage="Personne à TE de ce nom..."
                title="Ajouter un CDP"
                placeholder="Prénom du CDP"
            />
            {uiAdmins.length !== 0 && (
                <div className="flex flex-wrap space-x-2 py-4">
                    {uiAdmins.map((admin: string, i) => (
                        <div
                            key={i}
                            className="flex items-center px-2 space-x-2 rounded-full bg-slate-950"
                        >
                            <p>{admin}</p>
                            <Button
                                onClick={() => addRemoveAdmin(admin)}
                                variant="ghost"
                                className="px-0 py-0 hover:bg-transparent"
                            >
                                <X />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

import React from 'react';

function NamedInput({
    name,
    ...props
}: { name: string } & InputProps & React.RefAttributes<HTMLInputElement>) {
    return (
        <div>
            <p>{name}</p>
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
            <NamedInput name="Nom de l'étude" defaultValue={studyData?.name} />
            <NamedInput name="Durée estimée" defaultValue={studyData?.length} />
            <NamedInput name="Deadline pré-étude" type="date" className="w-full text-white" />
            <NamedInput name="Nombre d'intervenant" type="number" />
        </>
    );
}
