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
			xKey: null, // what if this is an array? => select dropdown => update on change etc
			yKey: null, // what if this is an array? => select dropdown => update on change etc
			paddingTickX: 0.05,
			margin: {
				top: 50,
				right: 50,
				bottom: 50,
				left: 50
			},
			standalone: true,
			isStacked: false, // what about Stacked Bar Charts ???
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
		this.$chartContainer = $(this.options.chartContainer, this.el);

		if (this.options.standalone) {
			this.addData();
			this.displayChart();
		}
	}


	/**
	 * Render class
	 */
	render() {

	}

	setXKey(key) {
		this.checkKey(key);
		this.xKey = key;
		this.xData = this.data.map(d => d[this.xKey]);
	}

	setYKey(key) {
		this.checkKey(key);
		this.yKey = key;
		this.yData = this.data.map(d => +d[this.yKey]);
	}

	addData(data = this.options.data) {
		this.data = data;

		if (this.options.xKey || this.options.yKey) {
			this.keys = Object.keys(data[0]);
			
			this.options.xKey && this.setXKey(this.options.xKey);
			this.options.yKey && this.setYKey(this.options.yKey);
		}
	}

	checkKey(key) {
		let keyExists = this.keys.indexOf(key) != -1;

		if (!keyExists) {
			throw new Error(`The key "${key}" you have provided is not available in the data.`);
		}
	}

	getXScale(data) {
		return d3
			.scaleBand()
			.domain(data)
			.rangeRound([0, (this.width || this.getDefaultWidth())])
			.padding(this.options.paddingTickX);
	}

	getYScale(data) {
		return d3.scaleLinear()
			.domain([0, d3.max(data)])
			.range([this.height, 0]);
	}

	getXAxis() {
		return d3
			.axisBottom()
			.scale(this.xScale);
	}

	getYAxis() {
		return d3
			.axisLeft()
			.scale(this.yScale);
	}

	displayChart() { // this should only be run once to 'initialize', otherwise error gets thrown
		if (this.initialized) {
			throw new Error("This component has already been initialized. Make sure you set standalone in this.options to false or check the documentation if you would like to run this module at runtime.");
		}

		this.initialized = true;

		this.height = this.options.svg.height - this.options.margin.top - this.options.margin.bottom;
		this.width = (this.options.svg.width || this.getDefaultWidth()) - this.options.margin.left - this.options.margin.right;
		this.svg = d3
			.select(this.$chartContainer[0])
			.append('svg')
			.classed(this.options.svg.contextClass, true)
			.attr('width', this.width + this.options.margin.left + this.options.margin.right)
			.attr('height', this.height + this.options.margin.top + this.options.margin.bottom)
			.style('background-color', this.options.svg.backgroundColor)
			.append('g')
			.attr('transform', 'translate(' + this.options.margin.left + ',' + this.options.margin.top + ')');

		this.renderData();
	}

	renderData() {
		this.xScaleGen = () => this.getXScale(this.xData? this.xData: this.data);
		this.yScaleGen = () => this.getYScale(this.yData? this.yData: this.data);

		this.xScale = this.xScaleGen();
		this.yScale = this.yScaleGen();

		this.calculateX = (d) => {
			d = this.xKey? d[this.xKey]: d;
			return this.xScale(d);
		};

		this.calculateY = (d) => {
			d = this.yKey? d[this.yKey]: d;
			return this.yScale(d);
		};

		if (!this.yAxis) {
			this.yAxis = this.svg
							.append('g')
							.classed('yaxis', true);
		}

		this.yAxis
			.transition()
			.duration(this.options.transitionDuration? this.options.transitionDuration : 0)
			.call(this.getYAxis());

		if (!this.xAxis) {
			this.xAxis = this.svg
							.append('g')
							.style('transform', `translateY(${ this.height }px)`)
							.classed('xaxis', true);
		}

		this.xAxis
			.transition()
			.duration(this.options.transitionDuration? this.options.transitionDuration : 0)
			.call(this.getXAxis());

		this.rect = this.svg
			.selectAll('rect')
			.data(this.data);

		this.rect
			.enter()
			.append('rect')
			.classed('bar', true);

		this.svg
			.selectAll('rect')
			.attr('x', (d) => {
				return this.calculateX(d);
			}) 
			.attr('y', (d) => {
				if (this.options.transitionDuration) {
					return this.height;
				}
				return this.height - Math.abs(this.calculateY(d) - this.yScale(0));
			})
			.attr('width', () => {
				return this.getXScale(this.xData? this.xData: this.data).bandwidth();
			})
			.style('transform', () => {
				return this.options.transitionDuration? 'rotate(0.5turn) translateY(0%)' : '';
			})
			.style('transform-origin', () => {
				return this.options.transitionDuration? '50% 50%' : '';
			})
			.transition()
			.delay(this.options.transitionDelay? this.options.transitionDelay : 0)
			.duration(this.options.transitionDuration? this.options.transitionDuration : 0)
			.attr('height', d => {
				return Math.abs(this.calculateY(d) - this.yScale(0));
			});
	}

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