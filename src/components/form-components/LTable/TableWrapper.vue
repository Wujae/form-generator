<script>

  import draggable from 'vuedraggable'
  import ColWrapper from './ColWrapper'

  /**
   * 表格 wrapper
   */
  export default {
    name: "TableWrapper",
    components: {
      draggable,
      ColWrapper
    },
    props: [
      'cols',
      'index',
      'drawingList',
      'activeId',
      'formConf',
      'widget',
      'container'
    ],
    render(h) {

      const dataObject = {
        attrs: {
          animation: 340,
          group: "componentsGroup",
          list: this.cols
        },
        'class': [
          'table-wrapper'
        ],
        props: {},
        on: {}
      }

      const { activeItem } = this.container.$listeners

      let colWrappers = [];

      // console.log('in table wrapper rendering', this, this.activeId, this.cols, this.formConf, this.widget)


      if (this.cols && Array.isArray(this.cols)) {

        colWrappers = this.cols.map((col, i) => {
          // console.log('in table wrapper rendering col', this.activeId, col.__config__.formId)

          let className = this.activeId === col.__config__.formId ? 'drawing-col-item active-from-item' : 'drawing-col-item'
          if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'

          return (
            <div class={className} onClick={event => {activeItem(col); event.stopPropagation()}}>
              <col-wrapper element={col} activeId={this.activeId} formConf={this.formConf}/>
              {this.widget.itemBtns.call(this.container, h, col, i, this.cols, true)}
            </div>
          )

        })

      }

      // console.log(colWrappers)

      return h('draggable', dataObject, colWrappers)

    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/gloal-config';

  .table-wrapper {

    padding-top: 10px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;

    min-height: 90px;
    width: 100%;

    overflow-x: auto;

  }

  .col-drag-wrapper {
    min-height: 120px;
  }

  .drawing-col-item {
    position: relative;

    & > .drawing-item-copy{
      display: none;
    }

    &:hover {
      & > .el-form-item{
        background: $selectedColor;
        border-radius: 6px;
      }
      & > .drawing-item-delete{
        display: initial;
      }
    }
    & > .drawing-item-delete{
      display: none;
      position: absolute;
      top: -10px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
      z-index: 1;
      right: 12px;
      border: 1px solid #F56C6C;
      color: #F56C6C;
      background: #fff;
      &:hover{
        background: #F56C6C;
        color: #fff;
      }
    }

    & > .drawing-item-copy {
      display: none !important;
    }
  }




</style>
