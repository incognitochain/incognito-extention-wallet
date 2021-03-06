import { IDBPDatabase, openDB } from 'idb';

class IndexedDb {
    private database: string;

    private db: any;

    constructor(database: string) {
        this.database = database;
    }

    public async createObjectStore(tableNames: string[]) {
        try {
            this.db = await openDB(this.database, 1, {
                upgrade(db: IDBPDatabase) {
                    for (const tableName of tableNames) {
                        if (db.objectStoreNames.contains(tableName)) {
                            continue;
                        }
                        db.createObjectStore(tableName, {
                            autoIncrement: true,
                            keyPath: 'id',
                        });
                    }
                },
            });
        } catch (error) {
            throw error;
        }
        return this;
    }

    public async getValue(tableName: string, key: number) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(key);
        return result;
    }

    public async getAllValue(tableName: string) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.getAll();
        return result;
    }

    public async addValue(tableName: string, value: any) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.add(value);
        return result;
    }

    public async addValueByKey(tableName: string, value: any, key: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.add(value, key);
        return result;
    }

    public async putBulkValue(tableName: string, values: any[]) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        let result: any[] = [];
        for (const value of values) {
            result.push(store.put(value));
        }
        await Promise.all(result);
        return this.getAllValue(tableName);
    }

    public async updateByKey(tableName: string, value: any) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value);
        return result;
    }

    public async deleteValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }

    public async clearCache(tableName: string) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        let clear = await store.clear();
        return clear;
    }
}

export default IndexedDb;
