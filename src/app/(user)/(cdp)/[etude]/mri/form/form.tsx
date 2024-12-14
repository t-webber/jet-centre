import { Form, FormRow, FormRule } from '@/components/ui/form';
import { DIFFICULTIES, DOMAINS, PAYS } from './schema';
import { InputFormElement } from '@/components/meta-components/form/input';
import { DropdownFormElement } from '@/components/meta-components/form/dropdown';
import { TextAreaFormElement } from '@/components/meta-components/form/textarea';

export default function MRICreationForm({ form }: { form: any }) {
    return (
        <Form {...form}>
            <form className="flex flex-col gap-2">
                <InputFormElement label="Titre" name="title" form={form} />
                <TextAreaFormElement label="Introduction" name="intro" form={form} resizable />

                <FormRule />

                <DropdownFormElement label="Domaine" name="domain" values={DOMAINS} form={form} />
                <FormRow>
                    <InputFormElement
                        className="w-1/3"
                        label="Rétribution basse"
                        name="pay_under"
                        type="number"
                        form={form}
                    />
                    <InputFormElement
                        className="w-1/3"
                        label="Rétribution haut"
                        name="pay_over"
                        type="number"
                        form={form}
                    />
                    <DropdownFormElement
                        className="w-1/3"
                        label="Rétribution"
                        name="pay_level"
                        values={PAYS}
                        form={form}
                    />
                </FormRow>
                <DropdownFormElement
                    label="Difficulté"
                    name="difficulty"
                    values={DIFFICULTIES}
                    form={form}
                />

                <FormRule />

                <TextAreaFormElement label="Compétences" name="skills" form={form} resizable />
                <TextAreaFormElement label="Échéances" name="due_date" form={form} resizable />
                <TextAreaFormElement label="Description" name="description" form={form} resizable />
            </form>
        </Form>
    );
}
