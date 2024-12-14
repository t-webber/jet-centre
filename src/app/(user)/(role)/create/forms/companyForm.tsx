'use client';

import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { DropdownFormElement } from '@/components/meta-components/form/dropdown';
import { InputFormElement } from '@/components/meta-components/form/input';
import { COMPANY_SIZES } from './companySchema';
import { FormRule } from '@/components/ui/form';

export default function CompanyForm({ form }: { form: any }) {
    // const [size, setSize] = useState(company?.size || null);
    // const [currentDomains, setDomains] = useState(company?.domains || []);

    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Informations générales sur l'entreprise</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <InputFormElement label="Nom de l'entreprise" name="company.name" form={form} />
                    <DropdownFormElement
                        label="Taille de l'entreprise"
                        name="company.size"
                        values={COMPANY_SIZES}
                        form={form}
                    />
                    {/* <ManyComboBox
                    items={dbDomains}
                    selectedKeys={currentDomains}
                    addRemoveKey={(k) => addRemoveKey(k, currentDomains, setDomains)}
                    title="Choisir des domains"
                    emptyMessage="Aucun domain de ce nom"
                    placeholder="Chercher un domaine"
                /> */}
                    <InputFormElement
                        label="CA (en k€)"
                        name="company.ca"
                        type="number"
                        form={form}
                    />

                    <FormRule />

                    <h4>Adresse</h4>
                    <div className="w-full block">
                        <div className="grid-cols-4 grid gap-2">
                            <InputFormElement
                                label="N°"
                                name="company.address.number"
                                form={form}
                                className="col-span-1"
                            />
                            <InputFormElement
                                label="Rue"
                                name="company.address.street"
                                form={form}
                                className="col-span-3"
                            />
                            <InputFormElement
                                label="Ville"
                                name="company.address.city"
                                form={form}
                                className="col-span-4"
                            />
                            <InputFormElement
                                label="Code postal"
                                name="company.address.zip"
                                form={form}
                                className="col-span-2"
                            />
                            <InputFormElement
                                label="Pays"
                                name="company.address.country"
                                form={form}
                                className="col-span-2"
                            />
                        </div>
                    </div>
                </div>
            </BoxContent>
        </Box>
    );
}
