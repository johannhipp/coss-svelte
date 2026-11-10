import { describe, expect, test } from "vitest";
import { dotMatrixGrid, GLYPH_HEIGHT, GLYPH_WIDTH } from "../src/internal/dot-matrix";

const glyphCells = (text: string) => dotMatrixGrid(text).cells;

const rows = (text: string) =>
	glyphCells(text).map((row) => row.map((filled) => (filled ? "#" : ".")).join(""));

describe("dotMatrixGrid", () => {
	test("renders the letter A from its 5x7 bitmap", () => {
		expect(rows("A")).toEqual([".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"]);
	});

	test("folds lowercase to uppercase", () => {
		expect(dotMatrixGrid("board")).toEqual(dotMatrixGrid("BOARD"));
	});

	test("lays out five glyphs with four gaps", () => {
		const grid = dotMatrixGrid("BOARD");
		expect(grid.cols).toBe(5 * GLYPH_WIDTH + 4);
		expect(grid.rows).toBe(GLYPH_HEIGHT);
	});

	test("keeps letter gaps empty and honours the gap width", () => {
		const grid = dotMatrixGrid("AB", 2);
		expect(grid.cols).toBe(12);
		expect(grid.cells.every((row) => !row[5] && !row[6])).toBe(true);
	});

	test("stacks lines with the requested line gap", () => {
		const grid = dotMatrixGrid("A\nA");
		expect(grid.rows).toBe(2 * GLYPH_HEIGHT + 1);
		expect(grid.cells[GLYPH_HEIGHT]).toEqual(Array(grid.cols).fill(false));
	});

	test("renders a space as empty cells and keeps the glyph width", () => {
		const grid = dotMatrixGrid(" ");
		expect(grid.cols).toBe(GLYPH_WIDTH);
		expect(grid.cells.every((row) => row.every((filled) => !filled))).toBe(true);
	});

	test("flags unsupported characters with a hollow box", () => {
		expect(rows("€")).toEqual(["#####", "#...#", "#...#", "#...#", "#...#", "#...#", "#####"]);
	});

	test("every supported character has at least one lit orb", () => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;!?-+/()'";
		for (const character of characters) {
			const cells = glyphCells(character);
			expect(cells.flat().some(Boolean)).toBe(true);
		}
	});

	test("returns an empty grid for empty text", () => {
		expect(dotMatrixGrid("")).toEqual({ cols: 0, rows: 0, cells: [] });
	});
});
