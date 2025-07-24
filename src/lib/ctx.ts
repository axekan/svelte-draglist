import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import makeId from './utils.js';

export interface DraggableItem extends Record<string | symbol, unknown> {
	id: string;
}

// identifies drag items using the unique symbol
export const getDragItemData = (item: DraggableItem, key: string) => {
	return {
		[key]: true,
		id: item.id,
	};
};

export const isDragItem = <T extends DraggableItem>(
	data: Record<string | symbol, unknown>,
	key: string,
): data is T => {
	return data[key] === true;
};

export type DragListSettings = {
	/** A unique key for the dragList, automatically generated */
	readonly key: string;
	gap: string;
};

export const createDragList = (settings: Partial<DragListSettings>) => {
	const key = makeId(16); // unique key for the dragList
	const gap = '8px';
	const store = writable<DragListSettings>({
		key,
		gap,
		...settings,
	});
	setContext('dragList', store);
	return store;
};

export const setDragItemContext = (item: DraggableItem) => {
	const store = writable<DraggableItem>(item);
	setContext('dragItem', store);
	return store;
};

type DragItemContext = {
	/** Settings for the entire dragList */
	settings: Writable<DragListSettings>;
	/** The current item */
	item: Writable<DraggableItem>;
};

/** Get the context for a DragItem */
export const getCtx = (): DragItemContext => {
	const settings = getContext<Writable<DragListSettings>>('dragList');
	const item = getContext<Writable<DraggableItem>>('dragItem');
	return { settings, item };
};
