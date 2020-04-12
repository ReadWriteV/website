<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 16, offset: 4}" :xl="{span: 12, offset: 6}">
        <base-box type="primary" title="更新日志">
          <div class="radio">
            排序：
            <el-radio-group v-model="reverse">
              <el-radio :label="true">倒序</el-radio>
              <el-radio :label="false">正序</el-radio>
            </el-radio-group>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :color="activity.color"
              :timestamp="activity.timestamp"
              placement="top"
            >
              <el-card>
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.content }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </base-box>
      </el-col>
    </el-row>
</div>
</template>

<script>
export default {
  data () {
    return {
      reverse: false,
      activities: [
        {
          title: 'v2.2.2',
          content: '增加全国疫情地图页面。',
          timestamp: '2020-4-12',
          color: '#67C23A'
        },
        {
          title: 'v2.2.1',
          content: '修改顶部导航栏的显示模式，在上拉时才显示；详细博客的布局优化。',
          timestamp: '2019-12-26',
          color: '#67C23A'
        },
        {
          title: 'v2.2.0',
          content: '完成单一博客内容在一页面单独显示。',
          timestamp: '2019-10-9',
          color: '#67C23A'
        },
        {
          title: 'v2.1.1',
          content: '修复页面底部在移动端出现布局错误的问题；取消在移动端显示Live2d人物模型，以优化移动端体验；采用平滑滚动。',
          timestamp: '2019-10-8',
          color: '#67C23A'
        },
        {
          title: 'v2.1.0',
          content: '优化页面结构；初步采用响应式布局，优化移动端体验。',
          timestamp: '2019-9-28',
          color: '#67C23A'// small
        },
        {
          title: 'v2.0.0',
          content: '添加用户登录和注册页面；迁移到Vue 3.0；优化页面结构。',
          timestamp: '2019-9-11',
          color: '#409EFF'// big
        },
        {
          title: 'v1.2.0',
          content: '添加底部信息栏；添加侧边导航栏；添加顶部导航栏。',
          timestamp: '2019-7-26',
          color: '#67C23A'
        },
        {
          title: 'v1.1.0',
          content: '添加博客页面；添加首页页面；添加下载页面；添加日志页面。',
          timestamp: '2019-7-25',
          color: '#67C23A'
        },
        {
          title: 'v1.0.0',
          content: '项目建立',
          timestamp: '2019-5-5',
          color: '#409EFF'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  margin: 20px;
}
</style>
