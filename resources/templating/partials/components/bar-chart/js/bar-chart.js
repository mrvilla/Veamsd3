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

			//chartContainer : '[data-js-item="chart-container"]'
			// data: [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
			// 	11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]
			// svg: {
			// 	width: 1200,
			// 	height: 500,
			// 	backgroundColor: "#f7f7f7"
			// }
			//
			// x: {
			// 	domainKey: 'name', // if you pass a generic object
			// 	rangeKey: 'value', // if you pass a generic object
			// 	align: 'left' || 'right' // left => align: 0, right => align 1, default => align center but not sure if this is going to be necessary !!!
			// },
			// y: {
			// 	linear: true
			// },
			transformX: x => x.name,
			transformY: y => y.value
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

		this.barChart.render();

		//this.barChart.addData([ 5, 10, 13, -19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]); // todo: what about negative values???

		this.barChart.addData([
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


		//this.barChart.displayChart();

		this.barChart.displayChart();

		// this.barChart.displayChart([
		// 	{
		// 		name: 'Name1',
		// 		value: 5
		// 	},
		// 	{
		// 		name: 'Name2',
		// 		value: 17
		// 	},
		// 	{
		// 		name: 'Name3',
		// 		value: 25
		// 	},
		// 	{
		// 		name: 'Name4',
		// 		value: 11
		// 	},
		// 	{
		// 		name: 'Name5',
		// 		value: 3
		// 	},
		// 	{
		// 		name: 'Name6',
		// 		value: 22
		// 	},
		// 	{
		// 		name: 'Name7',
		// 		value: 15
		// 	},
		// 	{
		// 		name: 'Name8',
		// 		value: 31
		// 	},
		// 	{
		// 		name: 'Name9',
		// 		value: 3
		// 	},
		// 	{
		// 		name: 'Name10',
		// 		value: 2
		// 	}
		// ]);

		//setTimeout(() => {
		// this.barChart.updateChart([11, 22, 33, 44, 55, 11, 22, 33, 44, 55, 11, 22, 33, 44, 55, 11, 22, 33, 44, 55]);
		//this.barChart.updateChart([11, 22, 33, 44]);
		//}, 1500);
	}


	/**
	 * Render class
	 */
	render() {
	}
}

export default BarChartComponent;