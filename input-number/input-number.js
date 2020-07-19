
function isValueNumber (value) {
	return (/(^-?[0-9]+\.{l}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
	template: '\
		<div class="input-number">\
			<input type="text"\
			:value="curVal"\
			@change="handleChange">\
			<button class="down"\
			@click="handleDown"\
			:disabled="curVal<=min">-</button>\
			<button class="up"\
			@click="handleUp"\
			:disabled="curVal>=max">+</button>\
		</div>',
	props: {
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		},
		value: {
			type: Number,
			default: 0
		}
	},
	data(){
		return {
			curVal: this.value
		}
	},
	watch: {
		curVal: function(val) {
			this.$emit('input', val)
			this.$emit('on-change', val)
		},
		value: function(val) {
			this.updateVal(val)
		}
	},
	methods: {
		updateVal: function(val) {
			if(val > this.max) this.value = max;
			if(val < this.min) this.value = min;
			this.curVal = val;
		},

		handleChange: function(evt){
			let val = evt.target.value.trim();
			let min = this.min;
			let max = this.max;

			if(isValueNumber(val)) {
				val = Number(val);
				this.curVal = val;
				if(val > max) {
					this.curVal = max;
				}
				if(val < min) {
					this.curVal = min;
				}
			} else {
				evt.target.value = this.curVal;
			}
		},

		handleDown: function(){
			if(this.curVal <= this.min) return;
			this.curVal --
		},

		handleUp: function(){
			if(this.curVal >= this.max) return;
			this.curVal ++
		}
	},
	mounted: function() {
		this.updateVal(this.value);
	}
})