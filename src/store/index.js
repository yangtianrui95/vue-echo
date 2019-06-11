import Vuex from 'vuex'
import Vue from 'vue'

const mutation = {
  SET_PLAY_LIST: 'setPlayList',
  SET_AUDIO_DATA: 'setAudioData',
  SET_AUDIO_ELE: 'setAudioEle',
  SET_AUDIO_TIME: 'setAudioTime',
  SET_AUDIO_DURATION: 'setAudioDuration',
};

const _mutation = {
  [mutation.SET_PLAY_LIST]: function (state, list) {
    if (!list || !list.length) {
      return;
    }
    state.playList = list;
    state.audio.data = list[0];
  },

  [mutation.SET_AUDIO_DATA](state, data) {
    state.audio.data = data;
  },

  [mutation.SET_AUDIO_ELE](state, data) {
    state.audio.ele = data;
  },

  [mutation.SET_AUDIO_TIME](state, data) {
    state.audio.currentTime = data;
  },

  [mutation.SET_AUDIO_DURATION](state, data) {
    state.audio.duration = data;
  }
};

const state = {
  // 播放列表
  playList: [],
  // audio模块
  audio: {
    // 所需字段必须提前定义，否则无法完成监听
    data: null,
    ele: null,
    currentTime: 0,
    duration: 0,
  }
};

const getters = {

  // 获取当前播放进度
  audioProgress(state) {
    let currentTime = state.audio.currentTime;
    let duration = state.audio.duration;
    if (!duration) {
      return '0%';
    }
    return (currentTime / duration * 100).toFixed(2) + '%';
  },

  audioData(state) {
    return state.audio.data;
  }

};

// 创建Vuex.Store实例之前，必须调用Vue.use(Vuex)
Vue.use(Vuex);
const vueStore = new Vuex.Store({
  state,
  getters,
  mutations: _mutation
});

export {vueStore, mutation}
