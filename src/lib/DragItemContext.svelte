<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setDragItemContext, type DraggableItem } from './ctx.js';

	let { item, children }: { item: DraggableItem, children: Snippet } = $props();

	const store = setDragItemContext(item);
	$effect(() => {
		$store = item
	});
</script>

{@render children()}
