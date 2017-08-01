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
			paddingLeftX: 100,
			paddingRightX: 50,
			paddingTickX: 0.05,
			svg: {
				contextClass: 'svg__bar-chart',
				height: 350,
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
		this.svg = d3
			.select(this.options.chartContainer)
			.append('svg')
			.classed(this.options.svg.contextClass, true)
			.attr('width', this.options.svg.width || this.getDefaultWidth())
			.attr('height', this.options.svg.height + 200)
			.style('background-color', this.options.svg.backgroundColor);
	}

	getXScale(data) {
		return d3
			.scaleBand()
			// .align(0.5)
			//.domain(d3.range(this.options.domainRange || data.length)) // later map index
			.domain(data) // later map value itself
			.rangeRound([this.options.paddingLeftX, (this.options.svg.width || this.getDefaultWidth()) - this.options.paddingRightX])
			.paddingInner(this.options.paddingTickX)
			.paddingOuter(0);

		// does it make sense to define different inner and outer paddings ???
	}

	getYScale(data) {
		return d3.scaleLinear()
			.domain(d3.extent(data))
			.range([this.options.svg.height, 0]);
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
		this.svg
			.append('g')
			.style('transform', `translateX(${ this.options.paddingLeftX - 50 }px)`)
			.classed('yaxis', true)
			.call(this.getYAxis(data));

		this.svg
			.append('g')
			.style('transform', `translateY(${ this.options.svg.height + 50 }px)`)
			.classed('xaxis', true)
			.call(this.getXAxis(data));

		this.svg
			.selectAll('rect')
			.data(data) // what about adding a key function here ???
			.enter()
			.append('rect')
			// .attr('x', (d, i) => this.getXScale(data)(i)) // map index to range of data.length
			.attr('x', (d, i) => this.getXScale(data)(d)) // scale value itself
			.attr('y', (d) => this.options.svg.height - Math.abs(this.getYScale(data)(d) - this.getYScale(data)(0)))
			.attr('width', this.getXScale(data).bandwidth())
			.attr('height', d => Math.abs(this.getYScale(data)(d) - this.getYScale(data)(0)))
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