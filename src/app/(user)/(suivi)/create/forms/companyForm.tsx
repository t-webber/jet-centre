import { Box, BoxContent, BoxHeader, BoxTitle } from '@/components/boxes/boxes';
import { DropdownSingleFormElement } from '@/components/meta-components/form/dropdownSingle';
import { InputFormElement } from '@/components/meta-components/form/input';
import { COMPANY_SIZES } from './companySchema';
import { FormRule } from '@/components/ui/form';
import { DropdownManyFormElement } from '@/components/meta-components/form/dropdownMany';
import { DOMAINS } from '@/settings/vars';

export default function CompanyForm({ form, formId }: { form: any; formId: string }) {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Informations générales sur l'entreprise</BoxTitle>
            </BoxHeader>
            <BoxContent>
                <div className="flex flex-col gap-2">
                    <InputFormElement
                        label="Nom de l'entreprise"
                        name="company.name"
                        form={form}
                        formId={formId}
                    />
                    <DropdownSingleFormElement
                        label="Taille de l'entreprise"
                        name="company.size"
                        values={COMPANY_SIZES}
                        form={form}
                        formId={formId}
                    />
                    <DropdownManyFormElement
                        label="Domaines d'activité"
                        name="company.domains"
                        values={DOMAINS}
                        form={form}
                        formId={formId}
                    />
                    <InputFormElement
                        label="CA (en k€)"
                        name="company.ca"
                        type="number"
                        form={form}
                        formId={formId}
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
                                formId={formId}
                            />
                            <InputFormElement
                                label="Rue"
                                name="company.address.street"
                                className="col-span-3"
                                form={form}
                                formId={formId}
                            />
                            <InputFormElement
                                label="Ville"
                                name="company.address.city"
                                className="col-span-4"
                                form={form}
                                formId={formId}
                            />
                            <InputFormElement
                                label="Code postal"
                                name="company.address.zip"
                                className="col-span-2"
                                form={form}
                                formId={formId}
                            />
                            <InputFormElement
                                label="Pays"
                                name="company.address.country"
                                className="col-span-2"
                                form={form}
                                formId={formId}
                            />
                        </div>
                    </div>
                </div>
            </BoxContent>
        </Box>
    );
}
