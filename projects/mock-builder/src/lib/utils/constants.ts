export const monacoOptions = {
	theme: 'vs-dark',
	language: 'json',
	formatOnType: true,
	minimap: {
		enabled: false
	},
	wordWrap: 'on',
	folding: true,
	showFoldingControls: 'always'
};
export const monacoOptionsReadOnly = {
	monacoOptions,
	readOnly: true
};
