// from @melt-ui/svelte
// @see https://github.com/melt-ui/melt-ui/blob/v0.76.3/src/lib/internal/actions/portal.ts

import { tick } from 'svelte';
import type { Action } from 'svelte/action';

export type PortalConfig = string | HTMLElement | undefined;

const isHTMLElement = (el: unknown): el is HTMLElement => {
    return el instanceof HTMLElement;
}

export const portal = ((el, target = 'body') => {
	let targetEl;

	if (!isHTMLElement(target) && typeof target !== 'string') {
		return {
			destroy: () => {},
		};
	}

	async function update(newTarget: HTMLElement | string | undefined) {
		target = newTarget;
		if (typeof target === 'string') {
			targetEl = document.querySelector(target);
			if (targetEl === null) {
				await tick();
				targetEl = document.querySelector(target);
			}
			if (targetEl === null) {
				throw new Error(`No element found matching css selector: "${target}"`);
			}
		} else if (target instanceof HTMLElement) {
			targetEl = target;
		} else {
			throw new TypeError(
				`Unknown portal target type: ${
					target === null ? 'null' : typeof target
				}. Allowed types: string (CSS selector) or HTMLElement.`
			);
		}
		el.dataset.portal = '';
		targetEl.appendChild(el);
		el.hidden = false;
	}

	function destroy() {
		el.remove();
	}

	update(target);
	return {
		update,
		destroy,
	};
}) satisfies Action<HTMLElement, PortalConfig>;