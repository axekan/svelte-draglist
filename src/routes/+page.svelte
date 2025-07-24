<script lang="ts">
	import DragHandle from "$lib/DragHandle.svelte";
	import DragItem from "$lib/DragItem.svelte";
	import DragList from "$lib/DragList.svelte";

    let items = [
        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
        { id: '3', content: 'Item 3' },
    ];
</script>

<h1>Svelte draglist</h1>

<DragList {items} onReorder={(newItems) => items = newItems} gap="8px">
    <DragItem>
        {#snippet children(item)}
            <div class="drag-item">
                <DragHandle />
                {item.content}
            </div>
        {/snippet}
    </DragItem>
</DragList>

<style>
    .drag-item {
        height: 40px;
        padding-left: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        border: 1px solid black;
        background-color: white;
    }
</style>