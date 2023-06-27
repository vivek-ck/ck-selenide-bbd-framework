import fs from 'fs';
import path from 'path';

export default class DataStore {
    private static dataMap = new Map()

    static setData(key: string, value: any): void {
        this.dataMap.set(key, value)
    }

    static getData(key: string): any {
        return this.dataMap.get(key)
    }

    static hasData(key: string): boolean {
        return this.dataMap.has(key)
    }

    static removeData(key: string): void {
        this.dataMap.delete(key)
    }

    static getAllKeys(): string[] {
        return Array.from(this.dataMap.keys())
    }

    static getAllValues(): any[] {
        return Array.from(this.dataMap.values())
    }

    static getSize(): number {
        return this.dataMap.size;
    }

    static getJson(): object {
        return Object.fromEntries(this.dataMap)
    }

    static dumpAsJson(): void {
        fs.writeFileSync(path.join(path.resolve(), 'dataDump.json'), JSON.stringify(this.getJson()))
    }

    static clear(): void {
        this.dataMap.clear()
    }
}
