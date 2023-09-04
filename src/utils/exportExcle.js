import FileSaver from "file-saver";
import * as XLSX from "xlsx";

const exportExcel = (data,filename) => {
    let ls =[]
    for(let i in data.value) {
        ls.push(data.value[i])
    }
    let ws = XLSX.utils.json_to_sheet(ls);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
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


