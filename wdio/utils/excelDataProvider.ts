import xlsx from 'node-xlsx';
import path from 'path';

export default function excelDataProvider(filename: string, schema: object) {
    let absFilePath = path.resolve('samplefiles/', filename)
    let rowData = xlsx.parse(absFilePath)[0].data
    let allColumns = rowData[0]
    let validColumns = getValidColumnsWithIndex(allColumns, schema)
    let parsedData: (typeof schema) [] = []

    for (let j = 1; j < rowData.length; ++j) {
        let columnData = {}
        let undefinedCount = 0
        for (let key in validColumns) {
            let cellValue = rowData[j][validColumns[key]]
            if (typeof cellValue === 'undefined') { 
                undefinedCount++
                cellValue = ""
            }
            columnData[key] = cellValue
        }
        if(undefinedCount !== Object.keys(validColumns).length)
        parsedData.push(columnData)
    }

    return parsedData
}

function getValidColumnsWithIndex(columns: string[], schema: object) {
    let columnsWithIndex = {}
    for (let i = 0; i < columns.length; ++i) {
        if (schema.hasOwnProperty(columns[i])) {
            columnsWithIndex[schema[columns[i]]] = i;
        }
    }
    return columnsWithIndex
} 