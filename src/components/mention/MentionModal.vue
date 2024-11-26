<template>
    <div id="mention-modal" :style="{ top, left, right, bottom }">
      <el-input id="mention-input" v-model="searchVal" ref="input" @keyup="inputKeyupHandler" onkeypress="if(event.keyCode === 13) return false" placeholder="请输入" />
      <el-scrollbar height="200px">
        <ul id="mention-list">
          <li v-for="item in searchedList" :key="item.id" @click="insertMentionHandler(item.id, item.label)">{{
            item.label }} 
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, nextTick } from 'vue'
  
  const props = defineProps<{
    position: any,
    tempList: object
  }>()
  const emit = defineEmits(['hideMentionModal', 'insertMention'])
  // 定位信息
  const top = computed(() => {
    return props.position.top
  })
  const bottom = computed(() => {
    return props.position.bottom
  })
  const left = computed(() => {
    return props.position.left
  })
  const right = computed(() => {
    if (props.position.right) {
      const right = +(props.position.right.split('px')[0]) - 180
      return right < 0 ? 0 : (right + 'px')
    }
    return ''
  })
  // list 信息
  const searchVal = ref('') 
  const list = ref(props.tempList)
  // 根据 <input> value 筛选 list
  const searchedList = computed(() => {
    const searchValue = searchVal.value.trim().toLowerCase()
    return list.value.filter(item => {
      const username = item.label.toLowerCase()
      if (username.indexOf(searchValue) >= 0) {
        return true
      }
      return false
    })
  })
  const inputKeyupHandler = (event: any) => {
    // esc - 隐藏 modal
    if (event.key === 'Escape') {
      emit('hideMentionModal')
    }
  
    // enter - 插入 mention node
    if (event.key === 'Enter') {
      // 插入第一个
      const firstOne = searchedList.value[0]
      if (firstOne) {
        const { id, label } = firstOne
        insertMentionHandler(id, label)
      }
    }
  }
  const insertMentionHandler = (id: any, username: any) => {
    emit('insertMention', id, `{{${username}}}`)
    emit('hideMentionModal') // 隐藏 modal
  }
  const input = ref()
  onMounted(() => {
    // 获取光标位置
    // const domSelection = document.getSelection()
    // const domRange = domSelection?.getRangeAt(0)
    // if (domRange == null) return
    // const rect = domRange.getBoundingClientRect()
  
    // 定位 modal
    // top.value = props.position.top
    // left.value = props.position.left
  
    // focus input
    nextTick(() => {
      input.value?.focus()
    })
  })
  </script>
  
  <style>
  #mention-modal {
    position: absolute;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px;
    transition: all .3s;
    z-index: inherit;
  }
  
  #mention-modal input {
    width: 150px;
    outline: none;
  }
  
  #mention-modal ul {
    padding: 0;
    margin: 5px 0 0;
  }
  
  #mention-modal ul li {
    list-style: none;
    cursor: pointer;
    padding: 5px 2px 5px 10px;
    text-align: left;
  }
  
  #mention-modal ul li:hover {
    background-color: #f1f1f1;
  }
  </style>
  