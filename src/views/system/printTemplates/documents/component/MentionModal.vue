<template>
    <div id="mention-modal" :style="{ top: top, left: left }" v-show="value">
        <input id="mention-input" v-model="searchVal" ref="input" @keyup="inputKeyupHandler">
        <ul id="mention-list">
            <li
                v-for="item in searchedList"
                :key="item.id"
                @click="insertMentionHandler(item.id, item.label)"
            >{{item.label}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MentionModal',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        appendToBody: {
          type: Boolean,
          default: false
        },
        value: {
          type: Boolean,
        }
    },
    data() {
        return {
            // 定位信息
            top: '',
            left: '',

            // list 信息
            searchVal: '',
        }
    },
    watch: {
      value(val) {
        if(val) {
          // 获取光标位置
          const domSelection = document.getSelection()
          const domRange = domSelection?.getRangeAt(0)
          if (domRange == null) return
          const rect = domRange.getBoundingClientRect()
          // 定位 modal
          this.top = `${rect.top + 20 + document.documentElement.scrollTop}px`
          // 44是padding
          this.left = `${rect.left + 5}px`
          // focus input
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        }else {
          this.searchVal = ''
        }
      }
    },
    computed: {
        // 根据 <input> value 筛选 list
        searchedList() {
            const searchVal = this.searchVal.trim().toLowerCase()
            return this.list.filter(item => {
                const name = item.field_display_name.toLowerCase()
                if (name.indexOf(searchVal) >= 0) {
                    return true
                }
                return false
            })
        }
    },
    methods: {
        inputKeyupHandler(event) {
            // esc - 隐藏 modal
            if (event.key === 'Escape') {
                this.$emit('hideMentionModal')
            }

            // enter - 插入 mention node
            if (event.key === 'Enter') {
                // 插入第一个
                const firstOne = this.searchedList[0]
                if (firstOne) {
                    const { id, field_display_name } = firstOne
                    this.insertMentionHandler(id, field_display_name)
                }
            }
        },
        insertMentionHandler(id, name) {
            this.$emit('insertMention', id, name)
            this.$emit('hideMentionModal') // 隐藏 modal
        }
    },
    mounted() {
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
    },
    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }

}
</script>

<style scoped>
#mention-modal {
    position: absolute;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px;
}

#mention-modal input {
    width: 100px;
    outline: none;
}

#mention-modal ul {
    padding: 0;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
}

#mention-modal ul li {
    list-style: none;
    cursor: pointer;
    padding: 3px 0;
    text-align: left;
}

#mention-modal ul li:hover {
    text-decoration: underline;
}
</style>
