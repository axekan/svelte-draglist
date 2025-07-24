/**
 * create a unique id
 * @default idLength 10
 * @param {number} [idLength=10] - length of the id to be created
 * @return {string} unique id
 *
 * @example
 * makeId(); // 'qzrj0i9ygh'
 * makeId(20); // '3w5muy33sbzzxe72zmiy'
 */
export default function makeId(idLength = 10): string {
	return [...Array(idLength).keys()].map(() => Math.random().toString(36).slice(2, 3)).join('');
}

export const noop = () => {};