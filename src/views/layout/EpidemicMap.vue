<template>
  <div>
    <div ref="mapbox" class="mapbox"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import jsonp from 'jsonp'

const option = {
  title: {
    text: '疫情地图'
  },
  series: [
    {
      type: 'map',
      map: 'china',
      label: {
        show: true,
        fontSize: 8
      },
      itemStyle: {
        areaColor: '#fff'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#c7fffd'
        }
      },
      zoom: 1.2
    }
  ],
  visualMap: [
    {
      type: 'piecewise',
      show: true,
      splitNumber: 6,
      pieces: [
        {
          min: 10000
        },
        {
          min: 1000,
          max: 9999
        },
        {
          min: 100,
          max: 999
        },
        {
          min: 10,
          max: 99
        },
        {
          min: 1,
          max: 9
        },
        {
          min: 0,
          max: 0
        }
      ],
      inRange: {
        symbol: 'rect',
        color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
      },
      itemHeight: 10,
      itemWidth: 20
    }
  ],
  tooltip: {
  }
}

export default {
  mounted () {
    this.getData()
    this.mychart = echarts.init(this.$refs.mapbox)
    this.mychart.setOption({ option })
  },
  methods: {
    getData () {
      jsonp(
        'http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',
        {},
        (erros, data) => {
          var lists = data.data.list.map(item => {
            return {
              name: item.name,
              value: item.value
            }
          })
          option.series[0].data = lists
          this.mychart.setOption(option)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.mapbox {
  width: 750px;
  height: 650px;
  margin: auto;
}
</style>
