import * as XLSX from "xlsx";

const workbook = XLSX.readFile("./data/Villagepart1.xls");

const sheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json<any>(sheet);

console.log(rows[0]);