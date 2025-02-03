import { saveAs } from "file-saver";
import JSZip from "jszip";

export const exportCodeAsFile = (fileName, extension, code) => {
	code.forEach((code, index) => {
		const blob = new Blob([code], {
			type: "text/plain;charset=utf-8",
		});
		saveAs(blob, `${fileName[index]}.${extension[index]}`);
	});
};

export const exportCodeAsZip = (fileName, files) => {
	const zip = new JSZip();
	files.forEach((file) =>
		zip.file(`${file.fileName}.${file.extension}`, file.code)
	);
	zip.generateAsync({ type: "blob" }).then(function (content) {
		saveAs(content, `${fileName}.zip`);
	});
};

export const copyCode = async (code) => {
	try {
		await navigator.clipboard.writeText(code);
	} catch (err) {
		//
	}
};
