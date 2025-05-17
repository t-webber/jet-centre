import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mdxeditor/editor';
import { FormProvider, useForm } from 'react-hook-form';

import { InputFormElement } from '@/components/meta-components/form/input';

import { clientFormSchema, ClientFormType } from './schema';

export function ClientAdder({ onSubmit }: { onSubmit: (values: ClientFormType) => void }) {
    const form = useForm<ClientFormType>({
        resolver: zodResolver(clientFormSchema),
    });

    return (
        <>
            <FormProvider {...form}>
                <form
                    className="space-y-main py-main"
                    action={() => console.log('hahahah')}
                    onSubmit={() => console.log('héhéhéh')}
                >
                    <InputFormElement
                        className="mb-0"
                        form={form}
                        label="Nom de l'emploi"
                        name="job"
                    />
                    <InputFormElement form={form} label="Prénom" name="firstName" />
                    <InputFormElement form={form} label="Nom de famille" name="lastName" />
                    <InputFormElement form={form} label="Numéro de téléphone" name="number" />
                    <div className="grid-cols-5 grid gap-x-main">
                        <InputFormElement
                            form={form}
                            className="mb-0"
                            label="N°"
                            name="address.number"
                        />
                        <InputFormElement
                            className="col-span-4 mb-0"
                            form={form}
                            label="Rue"
                            name="address.street"
                        />
                    </div>
                    <div className="grid-cols-2 grid gap-x-main">
                        <InputFormElement
                            className="mb-0"
                            form={form}
                            label="Ville"
                            name="address.city"
                        />
                        <InputFormElement
                            className="mb-0"
                            form={form}
                            label="Code postal"
                            name="address.zipCode"
                        />
                    </div>
                    <InputFormElement form={form} label="Pays" name="address.country" />
                </form>
            </FormProvider>
            <Button
                type="button"
                className="w-full"
                onClick={(e) => {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                }}
            >
                Valider
            </Button>
        </>
    );
}
