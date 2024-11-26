'use client';

import { ManyComboBox, SingleCombobox } from '@/components/meta-components/combobox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState, RefAttributes } from 'react';
import { CompanyContact, StudyData } from './page';
import { Input, InputProps } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@radix-ui/react-dropdown-menu';

function addRemoveKey(key: string, getList: string[], setList: (x: string[]) => void) {
    if (getList.includes(key)) {
        setList(getList.filter((a) => a !== key));
    } else {
        setList([...getList, key]);
    }
}

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
            {uiAdmins.length !== 0 && (
                <div className="flex flex-wrap space-x-2 py-4">
                    {uiAdmins.map((admin: string, i) => (
                        <div
                            key={i}
                            className="flex items-center px-2 space-x-2 rounded-full bg-slate-950"
                        >
                            <p>{admin}</p>
                            <Button
                                onClick={() => addRemoveKey(admin, uiAdmins, setAdmins)}
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

function NamedInput({
    name,
    ...props
}: { name: string } & InputProps & RefAttributes<HTMLInputElement>) {
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
            <NamedInput type="text" name="Nom de l'étude" defaultValue={studyData?.name} />
            <NamedInput type="text" name="Durée estimée" defaultValue={studyData?.length} />
            <NamedInput type="date" name="Deadline pré-étude" className="w-full text-white" />
            <NamedInput type="number" name="Nombre d'intervenant" />
        </>
    );
}

export function ContactSelector({
    companyContacts,
    studyContacts
}: {
    companyContacts: CompanyContact[];
    studyContacts: CompanyContact[];
}) {
    const [contacts, setContacts] = useState(studyContacts.map((contact) => contact.name));
    const selectContact = () => {};

    return (
        <>
            <NamedInput name="Nom du client" />
            <NamedInput name="Poste dans l'entreprise" type="text" />
            <NamedInput name="Email" type="email" />
            <NamedInput name="Téléphone" type="tel" />
            <div className="flex justify-center">
                <Button variant="outline" className="w-fit" type="submit">
                    Add
                </Button>
            </div>
            <Separator />
            <div>
                {contacts.map((contact, i) => (
                    <div key={i}>{contact}</div>
                ))}
            </div>
        </>
    );
}
