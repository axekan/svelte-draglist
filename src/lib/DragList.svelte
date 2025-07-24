<script lang="ts" generics="T extends DraggableItem">
	import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
	import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
	import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
	import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import { onMount, type Snippet } from 'svelte';
	import DragItemContext from './DragItemContext.svelte';
	import { createDragList, isDragItem, type DraggableItem } from './ctx.js';
	import { noop } from './utils.js';

	interface DragListProps {
		items?: Array<T>;
		onReorder?: (items: Array<T>) => void;
		gap?: string;
		class?: string;
		children: Snippet;
	}

	let { items = [], onReorder = noop, gap = '8px', class: className = '', children }: DragListProps = $props();

	const list = createDragList({ gap });
	$effect(() => {
		$list.gap = gap;
	});

	onMount(() => {
		return monitorForElements({
			canMonitor({ source }) {
				return isDragItem(source.data, $list.key);
			},
			onDrop({ location, source }) {
				const target = location.current.dropTargets[0];
				if (!target) {
					return;
				}

				const sourceData = source.data;
				const targetData = target.data;

				if (!isDragItem(sourceData, $list.key) || !isDragItem(targetData, $list.key)) {
					return;
				}

				const indexOfSource = items.findIndex((item) => item.id === sourceData.id);
				const indexOfTarget = items.findIndex((item) => item.id === targetData.id);

				if (indexOfTarget < 0 || indexOfSource < 0) {
					return;
				}

				const closestEdgeOfTarget = extractClosestEdge(targetData);

				items = reorderWithEdge({
					list: items,
					startIndex: indexOfSource,
					indexOfTarget,
					closestEdgeOfTarget,
					axis: 'vertical',
				});
				const element = document.querySelector(`[data-dragitem-id="${sourceData.id}"]`);
				if (element instanceof HTMLElement) {
					triggerPostMoveFlash(element);
				}

				if (typeof onReorder === 'function' && onReorder !== noop) {
					onReorder(items);
				}
			},
		});
	});
</script>

<div class="drag-list {className}" style:--drag-list-gap={gap}>
	{#each items as item (item.id)}
		<DragItemContext {item}>
			{@render children()}
		</DragItemContext>
	{/each}
</div>

<style>
	:global(.drag-list > :not([hidden]) ~ :not([hidden])) {
		margin-top: calc(var(--drag-list-gap));
	}
</style>