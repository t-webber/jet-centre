'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { DOMAINS, FormType, PAYS, defaultMriCreationSchema, mriCreationSchema } from './schema';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownFormElement } from '@/components/meta-components/form/dropdown';

export default function MRICreationForm() {
    const form = useForm<FormType>({
        resolver: zodResolver(mriCreationSchema),
        defaultValues: defaultMriCreationSchema,
    });

    const onChange = (newValue: string) => {
        console.log('new value = ', newValue);
    };

    return (
        <Form {...form}>
            <form className="space-y-5 py-5">
                <InputFormElement label="Titre" name="title" form={form} onChange={onChange} />
                <InputFormElement
                    label="Introduction"
                    name="intro"
                    form={form}
                    onChange={onChange}
                />
                <InputFormElement
                    label="Compétences"
                    name="skills"
                    form={form}
                    onChange={onChange}
                />
                <InputFormElement
                    label="Échéances"
                    name="due_date"
                    form={form}
                    onChange={onChange}
                />
                <InputFormElement
                    label="Description"
                    name="description"
                    form={form}
                    onChange={onChange}
                />
                <DropdownFormElement
                    label="Domaine"
                    name="domain"
                    values={DOMAINS}
                    form={form}
                    onChange={onChange}
                />
                <DropdownFormElement
                    label="Rétribution"
                    name="pay_level"
                    values={PAYS}
                    form={form}
                    onChange={onChange}
                />
            </form>
        </Form>
    );
}
