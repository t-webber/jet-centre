'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { DOMAINS, FormType, PAYS, defaultMriCreationSchema, mriCreationSchema } from './schema';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownFormElement } from '@/components/meta-components/form/dropdown';
import { TextAreaFormElement } from '@/components/meta-components/form/textarea';
import { useEffect } from 'react';

export default function MRICreationForm({ form }: { form: any }) {
    return (
        <Form {...form}>
            <form className="space-y-5 py-5">
                <InputFormElement label="Titre" name="title" form={form} />
                <TextAreaFormElement label="Introduction" name="intro" form={form} resizable />
                <TextAreaFormElement label="Compétences" name="skills" form={form} resizable />
                <TextAreaFormElement label="Échéances" name="due_date" form={form} resizable />
                <TextAreaFormElement label="Description" name="description" form={form} resizable />
                <DropdownFormElement label="Domaine" name="domain" values={DOMAINS} form={form} />
                <DropdownFormElement
                    label="Rétribution"
                    name="pay_level"
                    values={PAYS}
                    form={form}
                />
                <InputFormElement
                    label="Rétribution basse"
                    name="pay_under"
                    type="number"
                    form={form}
                />
                <InputFormElement
                    label="Rétribution haut"
                    name="pay_over"
                    type="number"
                    form={form}
                />
            </form>
        </Form>
    );
}
