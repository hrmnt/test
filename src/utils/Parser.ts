export const parseMap = (table: string) => {
    const newMap = table.slice(4).split("\n").filter(ss => ss.length > 0);
    const board = newMap.map((line) => {
        return Array.from({ length: line.length }, (_, i) => ({
            key: i,
            value: 0
        }))
    })
    return board
}