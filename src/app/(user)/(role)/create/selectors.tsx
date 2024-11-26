'use client';

import { ManyComboBox } from '@/components/meta-components/combobox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

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
        <div>
            <ManyComboBox
                items={admins}
                addRemoveKey={addRemoveAdmin}
                selectedKeys={uiAdmins}
                emptyMessage="Personne à TE de ce nom..."
                title="Ajouter un chef de projet..."
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
        </div>
    );
}
