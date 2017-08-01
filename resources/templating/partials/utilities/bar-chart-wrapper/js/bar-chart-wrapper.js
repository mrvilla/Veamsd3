/**
 * Description of BarChartWrapper.
 *
 * @module BarChartWrapper
 * @version v1.0.0
 *
 * @author Oliver Broad
 */

// Imports
import {Veams} from 'app';
import VeamsComponent from 'veams/src/js/common/component';

import * as d3 from 'd3';

// Variables
const $ = Veams.$;
const Helpers = Veams.helpers;

class BarChart extends VeamsComponent {

	/**
	 * Constructor for our class
	 *
	 * @see module.js
	 *
	 * @param {Object} obj - Object which is passed to our class
	 * @param {Object} obj.el - element which will be saved in this.el
	 * @param {Object} obj.options - options which will be passed in as JSON object
	 */
	constructor(obj) {
		let options = {
			chartContainer: '[data-js-item="chart"]',
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			paddingTickX: 0.05,
			margin: {
				top: 50,
				right: 50,
				bottom: 50,
				left: 50
			},
			svg: {
				contextClass: 'svg__bar-chart',
				height: 550,
				backgroundColor: '#f7f7f7'
			}
		};

		super(obj, options);
	}


	/**
	 * Get module information
	 */
	static get info() {
		return {
			version: '1.0.0'
		};
	}


	/**
	 * Event handling
	 */
	get events() {
		return {
			// 'click': 'render'
		}
	}


	/**
	 * Subscribe handling
	 */
	get subscribe() {
		return {
			// '{{Veams.EVENTS.resize}}': 'render'
		}
	}


	/**
	 * Initialize the view
	 *
	 */
	initialize() {
		this.$chartContainer = $(this.options.chartContainer);
	}


	/**
	 * Render class
	 */
	render() {
		this.height = this.options.svg.height - this.options.margin.top - this.options.margin.bottom;
		this.width = (this.options.svg.width || this.getDefaultWidth()) - this.options.margin.left - this.options.margin.right;

		this.svg = d3
			.select(this.options.chartContainer)
			.append('svg')
			.classed(this.options.svg.contextClass, true)
			.attr('width', this.width + this.options.margin.left + this.options.margin.right)
			.attr('height', this.height + this.options.margin.top + this.options.margin.bottom)
			.style('background-color', this.options.svg.backgroundColor)
			.append('g')
			.attr('transform', 'translate(' + this.options.margin.left + ',' + this.options.margin.top + ')');
	}

	getXScale(data) {
		return d3
			.scaleBand()
			// .align(0.5)
			//.domain(d3.range(this.options.domainRange || data.length)) // later map index
			.domain(data) // later map value itself
			.rangeRound([0, (this.width || this.getDefaultWidth())])
			.paddingInner(this.options.paddingTickX)
			.paddingOuter(0);

		// does it make sense to define different inner and outer paddings ???
	}

	getYScale(data) {
		return d3.scaleLinear()
			.domain([0, d3.max(data)])
			.range([this.height, 0]);
	}

	getXAxis(data) {
		return d3
			.axisBottom()
			.scale(this.getXScale(data));
	}

	getYAxis(data) {
		return d3
			.axisLeft()
			.scale(this.getYScale(data));
	}

	displayChart(data = this.options.data) {
		let dataX;
		let dataY;
		let xScale;
		let yScale;

		if (this.options.transformX) {
			dataX = data.map(x => this.options.transformX(x));
			xScale = () => {
				return this.getXScale(dataX);
			}
		}

		if (this.options.transformY) {
			dataY = data.map(y => this.options.transformY(y));
			yScale = () => {
				return this.getYScale(dataY);
			}
		}

		this.svg
			.append('g')
			.classed('yaxis', true)
			.call(this.getYAxis(dataY? dataY : data));

		this.svg
			.append('g')
			.style('transform', `translateY(${ this.height }px)`)
			.classed('xaxis', true)
			.call(this.getXAxis(dataX? dataX : data));

		this.svg
			.selectAll('rect')
			.data(data) // what about adding a key function here ???
			.enter()
			.append('rect')
			// .attr('x', (d, i) => this.getXScale(data)(i)) // map index to range of data.length
			.attr('x', (d, i) => {
				if (xScale) {
					return xScale()(this.options.transformX(d));
				}

				return this.getXScale(data)(d)
			}) // scale value itself
			.attr('y', (d) => {
				if (yScale) {
					return this.height - Math.abs(yScale()(this.options.transformY(d)) - yScale()(0))
				}

				return this.height - Math.abs(this.getYScale(data)(d) - this.getYScale(data)(0))
			})
			.attr('width', () => {
				if (xScale) {
					return xScale().bandwidth()
				}

				return this.getXScale(data).bandwidth()
			})
			.attr('height', d => {
				if (yScale) {
					return Math.abs(yScale()(this.options.transformY(d)) - yScale()(0));
				}

				return Math.abs(this.getYScale(data)(d) - this.getYScale(data)(0))
			})
			.classed('bar', true);
	}

	// updateChart(data) {
	// 	const rect = this.svg
	// 					.selectAll('rect')
	// 					.data(data);
	//
	// 	rect
	// 		.enter()
	// 		.append('rect');
	//
	// 	rect
	// 		.exit()
	// 		.remove();
	//
	// 	this.svg
	// 		.selectAll('rect')
	// 		.classed('bar', true)
	// 		.transition()
	// 		.attr('x', (d, i) => this.getXScale(data)(i))
	// 		.attr('y', 0)
	// 		.attr('width', this.getXScale(data).bandwidth())
	// 		.attr('height', d => Math.abs(this.getYScale(data)(d) - this.getYScale(data)(0)));
	//
	// }

	getDefaultWidth() {
		if (this.$chartContainer.length) {
			return this.$chartContainer.outerWidth();
		} else {
			console.error('No chart container found. ' +
						 'Specify a selector or add a div with the default "data-js-item=\"chart\".')
		}
	}
}

export default BarChart;