<script lang="ts">
	import {
		attachClosestEdge,
		extractClosestEdge,
	} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
	import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
	import {
		draggable,
		dropTargetForElements,
	} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
	import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
	import { portal } from './portal.js';
	import { onMount, type Snippet } from 'svelte';
	import DropIndicator from './DropIndicator.svelte';
	import DragPreview from './DragPreview.svelte';
	import { getCtx, getDragItemData, isDragItem, type DraggableItem } from './ctx.js';

	interface ItemState {
		type: 'idle' | 'preview' | 'is-dragging' | 'is-dragging-over';
		container?: HTMLElement;
		closestEdge?: Edge | null;
	}

	let { children, class: className = '' }: { children?: Snippet<[DraggableItem]>; class?: string } = $props();
	const { item, settings } = getCtx();

	let element: HTMLDivElement | undefined = $state(undefined);
	const idle: ItemState = { type: 'idle' };
	let dragState = $state(idle);

	onMount(() => {
		if (element === undefined) return;
		draggable({
			element,
			getInitialData() {
				return getDragItemData($item, $settings.key);
			},
			onGenerateDragPreview({ nativeSetDragImage }) {
				setCustomNativeDragPreview({
					nativeSetDragImage,
					getOffset: pointerOutsideOfPreview({
						x: '16px',
						y: '8px',
					}),
					render({ container }) {
						dragState = { type: 'preview', container };
					},
				});
			},
			onDragStart() {
				dragState = { type: 'is-dragging' };
			},
			onDrop() {
				dragState = idle;
			},
		});

		dropTargetForElements({
			element,
			canDrop({ source }) {
				// prevent dropping on yourself
				if (source.element === element) {
					return false;
				}
				// only allowing drag items to be dropped on me
				return isDragItem(source.data, $settings.key);
			},
			getData({ input }) {
				const data = getDragItemData($item, $settings.key);
				return attachClosestEdge(data, {
					element: element!,
					input,
					allowedEdges: ['top', 'bottom'],
				});
			},
			getIsSticky() {
				return true;
			},
			onDragEnter({ self }) {
				const closestEdge = extractClosestEdge(self.data);
				dragState = { type: 'is-dragging-over', closestEdge };
			},
			onDrag({ self }) {
				const closestEdge = extractClosestEdge(self.data);

				// Only need to update state if nothing has changed.
				// Prevents re-rendering.
				if (dragState.type !== 'is-dragging-over' || dragState.closestEdge !== closestEdge) {
					dragState = { type: 'is-dragging-over', closestEdge };
				}
			},
			onDragLeave() {
				dragState = idle;
			},
			onDrop() {
				dragState = idle;
			},
		});
	});
</script>

<div class="relative">
	<div
		data-dragitem-id={$item.id}
		bind:this={element}
		class="cursor-grab {className}"
		class:opacity-40={dragState.type === 'is-dragging'}>
		{@render children?.($item)}
	</div>

	{#if dragState.type === 'is-dragging-over' && dragState.closestEdge}
		<DropIndicator edge={dragState.closestEdge} gap={$settings.gap} />
	{/if}
</div>
{#if dragState.type === 'preview'}
	<div use:portal={dragState.container}>
		<DragPreview class={className}>{@render children?.($item)}</DragPreview>
	</div>
{/if}

<style>
	.relative {
		position: relative;
	}

	.cursor-grab {
		cursor: grab;
	}

	.opacity-40 {
		opacity: 0.4;
	}
</style>