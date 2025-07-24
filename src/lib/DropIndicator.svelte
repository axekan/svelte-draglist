<script lang="ts">
	import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

	let { edge, gap }: { edge: Edge, gap: string } = $props();

	const strokeSize = 2;
	const terminalSize = 8;
	const offsetToAlignTerminalWithLine = (strokeSize - terminalSize) / 2;
</script>

<div
	style:--line-thickness="{strokeSize}px"
	style:--line-offset="calc(-0.5 * ({gap} + {strokeSize}px))"
	style:--terminal-size="{terminalSize}px"
	style:--terminal-radius="{terminalSize / 2}px"
	style:--negative-terminal-size="-{terminalSize}px"
	style:--offset-terminal="{offsetToAlignTerminalWithLine}px"
	class="drop-indicator {edge === 'top' || edge === 'bottom' ? 'horizontal' : 'vertical'} {edge}">
</div>


<style>
	.drop-indicator {
		position: absolute;
		z-index: 10;
		background-color: #1d4ed8; /* blue-700 */
		pointer-events: none;
		box-sizing: border-box;
	}

	.drop-indicator::before {
		content: '';
		width: var(--terminal-size);
		height: var(--terminal-size);
		position: absolute;
		border: var(--line-thickness) solid #1d4ed8; /* blue-700 */
		border-radius: 50%;
	}

	/* Horizontal orientation (top/bottom edges) */
	.drop-indicator.horizontal {
		height: var(--line-thickness);
		left: var(--terminal-radius);
		right: 0;
	}

	.drop-indicator.horizontal::before {
		left: var(--negative-terminal-size);
	}

	/* Vertical orientation (left/right edges) */
	.drop-indicator.vertical {
		width: var(--line-thickness);
		top: var(--terminal-radius);
		bottom: 0;
	}

	.drop-indicator.vertical::before {
		top: var(--negative-terminal-size);
	}

	/* Edge-specific positioning */
	.drop-indicator.top {
		top: var(--line-offset);
	}

	.drop-indicator.top::before {
		top: var(--offset-terminal);
	}

	.drop-indicator.bottom {
		bottom: var(--line-offset);
	}

	.drop-indicator.bottom::before {
		bottom: var(--offset-terminal);
	}

	.drop-indicator.left {
		left: var(--line-offset);
	}

	.drop-indicator.left::before {
		left: var(--offset-terminal);
	}

	.drop-indicator.right {
		right: var(--line-offset);
	}

	.drop-indicator.right::before {
		right: var(--offset-terminal);
	}
</style>