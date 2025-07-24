<script lang="ts">
	import type { Snippet } from "svelte";

	let { children, class: className = '' }: { children: Snippet, class: string } = $props();
</script>

<div class="drag-preview {className}">
	{@render children()}
</div>

<style>
	.drag-preview {
		border: 1px solid var(--drag-preview-border-color, #ccc);
		border-radius: 4px;
		padding: 8px;
		background-color: var(--drag-preview-bg-color, #fff);
	}
</style>