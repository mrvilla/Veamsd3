
## INSERTPOINTS

### Include: Page

``` hbs
{{! @INSERT :: START @id: bar-chart, @tag: component-partial }}
{{#with bar-chart-bp}}
	{{> c-bar-chart}}
{{/with}}
{{! @INSERT :: END }}
```

### Include: SCSS

``` scss
// @INSERT :: START @tag: scss-import //
@import "components/_c-bar-chart";
// @INSERT :: END
// @INSERT :: START @tag: scss-self-contained-import //
@import "../templating/partials/components/bar-chart/scss/_c-bar-chart";
// @INSERT :: END
```

### Include: JavaScript

#### Import
``` js
// @INSERT :: START @tag: js-import //
import BarChart from './modules/bar-chart/bar-chart';
// @INSERT :: END
// @INSERT :: START @tag: js-self-contained-import //
import BarChart from '../templating/partials/components/bar-chart/js/bar-chart';
// @INSERT :: END
```

#### Initializing in Veams V2
``` js
// @INSERT :: START @tag: js-init-v2 //
/**
 * Init BarChart
 */
Helpers.loadModule({
	el: '[data-js-module="bar-chart"]',
	module: BarChart,
	context: context
});
// @INSERT :: END
```

#### Initializing in Veams V3
``` js
// @INSERT :: START @tag: js-init-v3 //
/**
 * Init BarChart
 */
Helpers.loadModule({
	domName: 'bar-chart',
	module: BarChart,
	context: context
});
// @INSERT :: END
```

#### Initializing in Veams V5
``` js
// @INSERT :: START @tag: js-init-v5 //
	,
	// Init BarChart
	{
		namespace: 'bar-chart',
		module: BarChart
	}
	// @INSERT :: END
```

#### Custom Events
``` js
// @INSERT :: START @tag: js-events //
/**
 * Events for BarChart
 */
EVENTS.barChart = {
	eventName: 'barChart:eventName'
};
// @INSERT :: END
```
