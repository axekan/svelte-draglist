<script lang="ts">
	import DragHandle from "$lib/DragHandle.svelte";

	let { label, status }: { label: string; status: 'TODO' | 'IN PROGRESS' | 'DONE' } = $props();

	// Map status to display styles
	const statusClass = $derived.by(() => {
		if (status === 'TODO') return 'status-todo';
		if (status === 'IN PROGRESS') return 'status-in-progress';
		return 'status-done';
	});
</script>

<div class="task-item">
	<DragHandle />
	<span class="task-label">{label}</span>
	<span class="status-badge {statusClass}">{status}</span>
</div>

<style>
	.task-item {
		height: 48px;
		padding: 0 16px 0 8px;
		display: flex;
		align-items: center;
		gap: 12px;
		border: 1px solid #e5e7eb;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	.task-label {
		flex: 1;
		font-size: 14px;
		color: #374151;
		font-weight: 400;
	}

	.status-badge {
		padding: 4px 12px;
		border-radius: 16px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	.status-todo {
		background-color: #ddd6fe;
		color: #6d28d9;
	}

	.status-in-progress {
		background-color: #fef3c7;
		color: #d97706;
	}

	.status-done {
		background-color: #d1fae5;
		color: #065f46;
	}

	.task-item:hover {
		border-color: #d1d5db;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
</style>
