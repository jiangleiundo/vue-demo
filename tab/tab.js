Vue.component('tabs', {
    template: `
        <div class="tabs">
            <div class="tabs-bar">
                <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">
                    {{item.label}}
                </div>
            </div>
            <div class="tabs-content">
                <slot></slot>
            </div>
        </div>
    `,
    props: {
        value: {
            type: [String, Number]
        },
    },
    data: function() {
        return {
            curVal: this.value,
            navList: [],
        }
    },
    methods: {
        tabCls: function(item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.curVal
                }
            ]
        },
        
        getTabs: function() {
            return this.$children.filter(item => {
                return item.$options.name === 'pane'
            })
        },

        updateNav: function() {
            let vm = this
            vm.navList = []
            vm.getTabs().forEach((pane, index) => {
                vm.navList.push({
                    label: pane.label,
                    name: pane.name,
                })
            });

            vm.updateStatus()
        },

        updateStatus: function () {
            let vm = this
            let tabs = vm.getTabs()
            tabs.forEach(tab => {
                return tab.show = tab.name === vm.curVal
            });
        },

        handleChange: function (index) {  
            let nav = this.navList[index]
            let name = nav.name
            this.curVal = name
            this.$emit('input', name)
            this.$emit('on-click', name)
        }
    },
    watch: {
        value(val) {
            this.curVal = val
        },
        curVal() {
            this.updateStatus()
        }
    }
})