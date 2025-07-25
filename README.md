# Svelte draglist

This is a lightweight implementation of drag and drop for Svelte 5 using the [Pragmatic drag and drop library](https://atlassian.design/components/pragmatic-drag-and-drop/about). It supports simple vertical lists with minimal configuration. The library relies on browser drag and drop behavior, and as such works well on both desktop and mobile. 

## [See live demo](https://axekan.github.io/svelte-draglist/)

## Usage

```svelte
<script>
    import { DragList, DragItem } from "svelte-draglist";
    
    let items = $state([
        {id: '1', name: "item1"},
        {id: '2', name: "item2"},
        {id: '3', name: "item3"},
        {id: '4', name: "item4"}
    ]);
</script>

<DragList {items} onReorder={(newItems) => items = newItems}>
    <Dragitem>
        {#snippet children(item)}
            <div>{item.name}</div>
        {/snippet}
    </DragItem>
</DragList>
```

## Options

### items (required)

```ts
items: Array<DraggableItem>
```

A list of items to render in the list. Items in the list can be an object of any shape, but must have an `id` property with a string value.

The list of items uses the type `DraggableItem`:

```ts
interface DraggableItem extends Record<string | symbol, unknown> {
	id: string;
}
```

### onReorder

```ts
onReorder?: (items: Array<T>) => void
```

A callback when the order changes through dragging. The function is called with the list of items in the updated order. Can be used to persist the changes or run custom logic.

### gap

```ts
gap?: string
```

A gap between list items in a css value. Default: `8px`.

### class

```ts
class?: string
```
Optional css classes to add to the draglist container.

