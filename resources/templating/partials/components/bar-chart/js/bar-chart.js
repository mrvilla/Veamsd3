/**
 * Description of BarChartComponent.
 *
 * @module BarChartComponent
 * @version v1.0.0
 *
 * @author Oliver Broad
 */

// Imports
import {Veams} from 'app';
import VeamsComponent from 'veams/src/js/common/component';

import BarChartWrapper from '../../../utilities/bar-chart-wrapper/js/bar-chart-wrapper';
import * as d3 from 'd3';

// Variables
const $ = Veams.$;
const Helpers = Veams.helpers;

class BarChartComponent extends VeamsComponent {

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
			standalone: false, // this is important if you run it at runtime !!!
			transitionDuration: 1000,
			svg: {
				contextClass: 'svg__bar-chart--runtime',
				height: 550,
				backgroundColor: '#f7f7f7'
			},
			xKey: 'State',
			yKey: 'TotalPopulation'
			
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
		this.barChart = new BarChartWrapper({
			el: this.el,
			namespace: 'BarChartWrapper',
			appInstance: Veams,
			options: this.options
		});
		
		this.fetchData().then(data => {
			this.barChart.addData(data.filter(d => d.Year == "2012"));
			this.barChart.displayChart();

			this.attachClickHandler()
		});

		this.$el.find('button').on('click', () => {
			this.barChart.setYKey('HispanicPopulation');
			console.log(this.barChart.yData);
		});
		
		//setTimeout(() => {
		// this.barChart.updateChart([11, 22, 33, 44, 55, 11, 22, 33, 44, 55, 11, 22, 33, 44, 55, 11, 22, 33, 44, 55]);
		//this.barChart.updateChart([11, 22, 33, 44]);
		//}, 1500);
	}

	fetchData() {
		return new Promise((resolve, reject) => {
			d3.tsv('../DataSrc/VotingInformation.tsv', (err, data) => {
				if (data) {
					resolve(data);
				}
				reject('Retrieving data failed. ' + err);
			});
		});
	}

	attachClickHandler() {
		d3
			.select(this.el)
			.selectAll('rect')
			.on('mouseenter', (d, i, nodes) => {
				console.log(d[this.barChart.xKey] + ': ' + d[this.barChart.yKey]);
			});
	}

	/**
	 * Render class
	 */
	render() {
	}
}

export default BarChartComponent;