export class ClipboardHelper {
    static getTableContent(data: DataTransfer): string[][] {
        let result = data.getData('text/html');
        if (result.length > 0) {
            const dom = new DOMParser().parseFromString(result, 'text/html');
            const table = dom.querySelector('table');
            if (table) {
                const rows = table.querySelectorAll('tr');
                if (rows.length > 0) {
                    const lines: string[][] = [];
                    rows.forEach((r, i) => {
                        const cells = r.querySelectorAll('td');
                        const cols: string[] = [];
                        cells.forEach(c => {
                            if (c.hasAttribute('rowspan') || c.hasAttribute('colspan')) {
                                throw new Error('The rowspan and colspan attributes are not allowed inside tables for import');
                            }
                            const text = c.textContent ?? '';
                            cols.push(text);
                        });
                        lines.push(cols);
                    });
                    if (lines.length > 0) {
                        const lengthes = [...new Set(lines.map(l => l.length))];
                        if (lengthes.length === 1 && lengthes[0] > 0) {
                            return lines;
                        }
                    }
                }
            }
        }
        // fallback solution, if html delivers no valid data
        result = data.getData('text/plain');
        if (result.length > 0) {
            const lines = result.split('\n').map(r => r.split('\t'));
            if (lines.length > 0) {
                const lengthes = [...new Set(lines.map(l => l.length))];
                if (lengthes.length === 1 && lengthes[0] > 0) {
                    console.log('text', result);
                    return lines;
                }
            }
        }
        throw new Error('No valid table could be retrieved from clipboard.');
    }
}