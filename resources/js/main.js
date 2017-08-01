// Global dependencies
import {App, Veams} from './app';

console.log('JS initialized in version:', App.version);
console.log('Veams initialized in version:', Veams.base.version);

// Imports


import BarChart from '../templating/partials/components/bar-chart/js/bar-chart';


import BarChartWrapper from '../templating/partials/utilities/bar-chart-wrapper/js/bar-chart-wrapper';

// @INSERTPOINT :: @ref: js-self-contained-import, @keep: true //

// Initialize modules with Veams
Veams.modules.register([

	,
	// Init BarChartWrapper
	{
		namespace: 'bar-chart-wrapper',
		module: BarChartWrapper
	}
	,
	// Init BarChart
	{
		namespace: 'bar-chart',
		module: BarChart
	}

    // @INSERTPOINT :: @ref: js-init-v5, @keep: true //
]);

// @INSERTPOINT :: @ref: js-init-once-v5, @keep: true //
