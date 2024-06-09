'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Form } from '@/components/ui/form';
import { DOMAINS, FormType, PAYS, defaultMriCreationSchema, mriCreationSchema } from './schema';
import { InputFormElement } from '@/components/form/input';
import { DropdownFormElement } from '@/components/form/dropdown';

export default function MRICreationForm() {
    const form = useForm<FormType>({
        resolver: zodResolver(mriCreationSchema),
        defaultValues: defaultMriCreationSchema,
    });

    const onSubmit = (values: FormType) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form className="space-y-5 py-5">
                <InputFormElement label="Titre" name="title" form={form} />
                <InputFormElement label="Introduction" name="intro" form={form} />
                <InputFormElement label="Compétences" name="skills" form={form} />
                <InputFormElement label="Échéances" name="due_date" form={form} />
                <InputFormElement label="Description" name="description" form={form} />
                <DropdownFormElement label="Domaine" name="domain" values={DOMAINS} form={form} />
                <DropdownFormElement
                    label="Rétribution"
                    name="pay_level"
                    values={PAYS}
                    form={form}
                />
            </form>
        </Form>
    );
}
