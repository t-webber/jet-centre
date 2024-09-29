# Components

## Shadcn components

See the list [here](https://ui.shadcn.com/docs/components/).

## Local components

### Box

To create the boxes of the template.

Usage:

```jsx
import { Box, BoxContent, BoxHeader, BoxLink, BoxTitle } from '@/components/boxes/boxes';

export default function Page() {
    return (
        <Box className="w-full">
            <BoxHeader>
                <BoxTitle>Écriture du MRI</BoxTitle>
                <BoxLink href="/examples">Voir des exemples</BoxLink>
            </BoxHeader>
            <BoxContent>
                <p>Lorem Ipsum</p>
            </BoxContent>
        </Box>
    );
}
```

### Sortable List

To create lists that can be reordered

Usage:

```jsx
import SortableList from '@/components/animations/drag';

export default function Page() {
    return (
        <SortableList
            initialItems={assignees}
            colors={{}}
            className="h-full"
            getKey={(assignee) => assignee.email}
            render={(assignee) => <div>{assignee.name}</div>}
        />
    );
}
```
