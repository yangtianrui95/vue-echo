import Vuex from 'vuex'
import Vue from 'vue'

const mutation = {
  SET_PLAY_LIST: 'setPlayList',
  SET_AUDIO_DATA: 'setAudioData'
};

const state = {
  // 播放列表
  playList: [],
  // audio模块
  audio: {
    // 所需字段必须提前定义，否则无法完成监听
    data:null
  }
};

// 创建Vuex.Store实例之前，必须调用Vue.use(Vuex)
Vue.use(Vuex);
const vueStore = new Vuex.Store({
  state,
  mutations: {
    [mutation.SET_PLAY_LIST]: function (state, list) {
      console.log('mutation setPlayList', list);
      if (!list || !list.length) {
        return;
      }
      state.playList = list;
      state.audio.data = list[0];
    },

    [mutation.SET_AUDIO_DATA](state, data){
      console.log('mutation setAudioData');
      state.audio.data = data;
    }
  }
});

export {vueStore, mutation}
