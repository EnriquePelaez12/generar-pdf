var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
	content: [
	
		{ text: 'BorderColor per Cell with Column/row spans', pageBreak: 'before', style: 'subheader' },
		'Each cell-element can set the borderColor (the cell above or left of the current cell has priority',
		{
			style: 'tableExample',
			color: '#444',
			table: {
				widths: [200, 'auto', 'auto'],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [
					[
						{
							text: 'Header with Colspan = 3',
							style: 'tableHeader',
							colSpan: 3,
							borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
							alignment: 'center',
						},
						{},
						{},
					],
					[
						{
							text: 'Header 1',
							style: 'tableHeader',
							alignment: 'center',
						},
						{
							text: 'Header 2',
							style: 'tableHeader',
							alignment: 'center',
						},
						{
							text: 'Header 3',
							style: 'tableHeader',
							alignment: 'center',
						},
					],
					[
						'Sample value 1',
						'Sample value 2',
						'Sample value 3',
					],
					[
						{
							rowSpan: 3,
							borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
							text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
						},
						'Sample value 2',
						{
							text: 'Sample value 3',
							borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
						},
					],
					[
						'',
						'Sample value 2',
						'Sample value 3',
					],
					[
						'Sample value 1',
						'Sample value 2',
						'Sample value 3',
					],
					[
						'Sample value 1',
						{
							colSpan: 2,
							rowSpan: 2,
							borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
							text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time',
						},
						'',
					],
					[
						'Sample value 1',
						{
							text: 'a', borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
						},
						{
							text: '',
							borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
						},
					],
				],
			},
		},
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableOpacityExample: {
			margin: [0, 5, 0, 15],
			fillColor: 'blue',
			fillOpacity: 0.3
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
pdfDoc.end();
