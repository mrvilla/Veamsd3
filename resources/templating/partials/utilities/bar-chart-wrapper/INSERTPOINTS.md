
## INSERTPOINTS

### Include: Page

``` hbs
{{! @INSERT :: START @id: bar-chart-wrapper, @tag: utility-partial }}
{{#with bar-chart-wrapper-bp}}
	{{> u-bar-chart-wrapper}}
{{/with}}
{{! @INSERT :: END }}
```

### Include: SCSS

``` scss
// @INSERT :: START @tag: scss-import //
@import "utilities/_u-bar-chart-wrapper";
// @INSERT :: END
// @INSERT :: START @tag: scss-self-contained-import //
@import "../templating/partials/utilities/bar-chart-wrapper/scss/_u-bar-chart-wrapper";
// @INSERT :: END
```

### Include: JavaScript

#### Import
``` js
// @INSERT :: START @tag: js-import //
import BarChartWrapper from './modules/bar-chart-wrapper/bar-chart-wrapper';
// @INSERT :: END
// @INSERT :: START @tag: js-self-contained-import //
import BarChartWrapper from '../templating/partials/utilities/bar-chart-wrapper/js/bar-chart-wrapper';
// @INSERT :: END
```

#### Initializing in Veams V2
``` js
// @INSERT :: START @tag: js-init-v2 //
/**
 * Init BarChartWrapper
 */
Helpers.loadModule({
	el: '[data-js-module="bar-chart-wrapper"]',
	module: BarChartWrapper,
	context: context
});
// @INSERT :: END
```

#### Initializing in Veams V3
``` js
// @INSERT :: START @tag: js-init-v3 //
/**
 * Init BarChartWrapper
 */
Helpers.loadModule({
	domName: 'bar-chart-wrapper',
	module: BarChartWrapper,
	context: context
});
// @INSERT :: END
```

#### Initializing in Veams V5
``` js
// @INSERT :: START @tag: js-init-v5 //
	,
	// Init BarChartWrapper
	{
		namespace: 'bar-chart-wrapper',
		module: BarChartWrapper
	}
	// @INSERT :: END
```

#### Custom Events
``` js
// @INSERT :: START @tag: js-events //
/**
 * Events for BarChartWrapper
 */
EVENTS.barChartWrapper = {
	eventName: 'barChartWrapper:eventName'
};
// @INSERT :: END
```
