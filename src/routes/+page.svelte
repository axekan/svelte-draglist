<script lang="ts">
	import DragItem from "$lib/DragItem.svelte";
	import DragList from "$lib/DragList.svelte";
	import Task from "./Task.svelte";
	import type { DraggableItem } from "$lib/ctx.js";

	type TaskStatus = 'TODO' | 'IN PROGRESS' | 'DONE';
	
	interface TaskItem extends DraggableItem {
		label: string;
		status: TaskStatus;
	}

	let items: TaskItem[] = $state([
		{ id: '1', label: 'Organize a team-building event', status: 'TODO' },
		{ id: '2', label: 'Create and maintain office inventory', status: 'IN PROGRESS' },
		{ id: '3', label: 'Update company website content', status: 'DONE' },
		{ id: '4', label: 'Plan and execute marketing campaigns', status: 'TODO' },
		{ id: '5', label: 'Coordinate employee training sessions', status: 'DONE' },
		{ id: '6', label: 'Manage facility maintenance', status: 'DONE' },
		{ id: '7', label: 'Organize customer feedback surveys', status: 'TODO' },
		{ id: '8', label: 'Coordinate travel arrangements', status: 'IN PROGRESS' },
	]);
</script>

<div class="container" style="margin: auto;">
    <h1>Svelte DragList demo</h1>
    <p>Drag and drop tasks to reorder them.</p>
    <div class="list-wrapper">
        <DragList {items} onReorder={(newItems) => items = newItems} gap="8px">
            <DragItem>
                {#snippet children(item)}
                    <Task label={item.label} status={item.status} />
                {/snippet}
            </DragItem>
        </DragList>
    </div>
</div>


<style>
    .container {
        width: min(420px, 100%);
        overflow: hidden;
    }

    h1 {
        margin-bottom: 0;
    }

    .list-wrapper {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 8px;
    }

    :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #f3f4f6;
        color: #111827;
    }

    :global(*, :before, :after) {
        box-sizing: border-box;
    }
</style>