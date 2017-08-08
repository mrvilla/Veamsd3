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
			transitionDuration: 500,
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
			data = data.filter(d => d.Year == "2012");
			this.barChart.addData(data);
			this.barChart.displayChart();
			this.renderSelect(data);
			this.attachClickHandler()
		});

		this.$el.find('select').on('change', (e) => {
			this.barChart.setYKey(e.target.value);
			this.barChart.renderData();
		});
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

	renderSelect(data) {
		d3.select('select').selectAll("option")
			.data(Object.keys(data[0]).filter(d => (d != 'Year' && d != 'State')))
			.enter().append("option")
			.attr("value", function(d){
				return d;
			})
			.text(function(d){
				return d;
			})
	}

	attachClickHandler() {
		d3
			.select(this.el)
			.selectAll('rect')
			.on('click', (d, i, nodes) => {
				alert(this.barChart.yKey + " of " + d[this.barChart.xKey] + ': ' + d[this.barChart.yKey]);
			});
	}

	/**
	 * Render class
	 */
	render() {
	}
}

export default BarChartComponent;