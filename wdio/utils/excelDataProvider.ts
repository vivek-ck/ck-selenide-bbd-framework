import readXlsxFile from 'read-excel-file/node'
import path from 'path';

export default async function excelDataProvider(filename: string, excelSchema: any) {
    let absFilePath = path.resolve('samplefiles/', filename)
    return await readXlsxFile(absFilePath, { map: excelSchema });
}