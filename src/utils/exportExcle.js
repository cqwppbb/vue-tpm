import FileSaver from "file-saver";
import * as XLSX from "xlsx";

const exportExcel = (filename) => {
    let wb = XLSX.utils.table_to_book(document.querySelector("#table"));
    let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
    });
    try {
        //文件名可以自定义
        FileSaver.saveAs(
            new Blob([wbout], {type: "application/octet-stream"}),
            filename
        );
    } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
    }
    return wbout;
}

export {exportExcel} ;


