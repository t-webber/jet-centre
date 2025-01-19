import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';
import { InputFormElement } from '@/components/meta-components/form/input';
import { COMPANY_SIZES } from './companySchema';
import { FormRule } from '@/components/ui/form';
import { DropdownManyFormElement } from '@/components/meta-components/form/dropdownMany';
import { DOMAINS } from '@/settings/vars';

export default function CompanyForm({ form }: { form: any }) {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Informations générales sur l&apos;entreprise</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <InputFormElement label="Nom de l'entreprise" name="company.name" form={form} />
                    <DropdownSingleFormElement
                        label="Taille de l'entreprise"
                        name="company.size"
                        values={COMPANY_SIZES}
                        form={form}
                    />
                    <DropdownManyFormElement
                        label="Domaines d'activité"
                        name="company.domains"
                        values={DOMAINS}
                        form={form}
                    />
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
                                className="col-span-1"
                                form={form}
                            />
                            <InputFormElement
                                label="Rue"
                                name="company.address.street"
                                className="col-span-3"
                                form={form}
                            />
                            <InputFormElement
                                label="Ville"
                                name="company.address.city"
                                className="col-span-4"
                                form={form}
                            />
                            <InputFormElement
                                label="Code postal"
                                name="company.address.zip"
                                className="col-span-2"
                                form={form}
                            />
                            <InputFormElement
                                label="Pays"
                                name="company.address.country"
                                className="col-span-2"
                                form={form}
                            />
                        </div>
                    </div>
                </div>
            </BoxContent>
        </Box>
    );
}
