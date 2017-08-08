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
			xKey: 'name',
			yKey: 'value'
			
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

		//this.barChart.addData([ 5, 10, 13, -19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]); // todo: what about negative values???

		// this.barChart.addData([
		// 		{
		// 			name: 'Name1',
		// 			value: 5
		// 		},
		// 		{
		// 			name: 'Name2',
		// 			value: 17
		// 		},
		// 		{
		// 			name: 'Name3',
		// 			value: 25
		// 		},
		// 		{
		// 			name: 'Name4',
		// 			value: 11
		// 		},
		// 		{
		// 			name: 'Name5',
		// 			value: 3
		// 		},
		// 		{
		// 			name: 'Name6',
		// 			value: 22
		// 		},
		// 		{
		// 			name: 'Name7',
		// 			value: 15
		// 		},
		// 		{
		// 			name: 'Name8',
		// 			value: 31
		// 		},
		// 		{
		// 			name: 'Name9',
		// 			value: 3
		// 		},
		// 		{
		// 			name: 'Name10',
		// 			value: 2
		// 		}
		// ]);
		//
		//
		// this.barChart.displayChart();

		this.fetchData().then(data => {
			this.barChart.addData(data);
			this.barChart.displayChart();
		});

		//setTimeout(() => {
		// this.barChart.updateChart([11, 22, 33, 44, 55, 11, 22, 33, 44, 55, 11, 22, 33, 44, 55, 11, 22, 33, 44, 55]);
		//this.barChart.updateChart([11, 22, 33, 44]);
		//}, 1500);
	}

	fetchData() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve([
					{
						name: 'Name1',
						value: 5
					},
					{
						name: 'Name2',
						value: 17
					},
					{
						name: 'Name3',
						value: 25
					},
					{
						name: 'Name4',
						value: 11
					},
					{
						name: 'Name5',
						value: 3
					},
					{
						name: 'Name6',
						value: 22
					},
					{
						name: 'Name7',
						value: 15
					},
					{
						name: 'Name8',
						value: 31
					},
					{
						name: 'Name9',
						value: 3
					},
					{
						name: 'Name10',
						value: 2
					}
				]);
			}, 100);
		})
	}

	/**
	 * Render class
	 */
	render() {
	}
}

export default BarChartComponent;