var app = new Vue({
	el: '#app',
	data: {
		list: [
			{
				id: 1,
				name: 'iphoneSE',
				price: 6688,
				count: 1,
				check: false
			},
			{
				id: 2,
				name: 'iPad Pro',
				price: 4888,
				count: 1,
				check: false
			},
			{
				id: 3,
				name: 'MacBook Pro 16',
				price: 6688,
				count: 1,
				check: false
			}
		],
		selAll: false
	},
	computed: {
		totalPrice(){
			let total = 0
			this.list.forEach(item => {
				if(item.check){
					total += item.price * item.count
				}
			})
			return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
		}
	},
	methods: {
		handleReduce: function(index){
			this.list[index].count--
		},

		handleAdd: function(index){
			this.list[index].count++
		},

		handleDel: function(id) {
			this.list = this.list.filter(function(item){
				return item.id !== id
			})
		},

		changeAll: function(val){
			this.list.map(function(item){
				item.check = val
			})
		},

		handleChange: function(index){
			this.selAll = this.list.every(function(val){
				return val.check
			})
		}
	},
})