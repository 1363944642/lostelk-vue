<template>
  <div class="comment">
    <div class="comment-header">
      <div class="comment-sum">
        {{ commentsNumber != 0 ? commentsNumber + '条评论' : '还没有评论,发表第一个评论吧' }}
      </div>
    </div>
    <div class="comment-list" id="commentAnchor">
      <div v-for="comment in comments" :key="comment.id">
        <SingleComment
          :comment="comment"
          :postId="postIdProp"
          :userId="userId"
          :postUserIdProp="postUserIdProp"
          @reloadComments="getComment"
        ></SingleComment>
      </div>
    </div>
    <div class="comment-footer">
      <ValidateForm class="comment-form">
        <ValidateInput
          class="comment-input"
          type="text"
          placeholder="写下你的评论"
          v-model="publishCommentVal"
          :value="publishCommentVal"
        >
        </ValidateInput>
        <template v-slot:submit>
          <div :class="['comment-groug', { hidden: !publishCommentButton }]" @click="onFormSubmit">
            <a href="#" class="form-btn">
              发表
            </a>
          </div>
        </template>
      </ValidateForm>
      <span class="form-error" v-if="publishCommentMax">
        最大可输入长度为60个字符
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { lostelkUrl } from '../../global';
import ValidateInput from '../form/ValidateInput.vue';
import ValidateForm from '../form/ValidateForm.vue';
import SingleComment from './Comment.vue';
import store from '../../store';
import createTooltip from '../globalFun/createTooltip';

export default defineComponent({
  name: 'Comments',
  components: {
    ValidateInput,
    ValidateForm,
    SingleComment,
  },
  props: {
    postId: Number,
    postUserId: Number,
    showCommentsCut: Boolean,
  },
  setup(props) {
    // 获取当前用户ID
    const userId = computed(() => store.state.user.id);

    //获取当前内容的作者
    const postUserIdProp = computed(() => props.postUserId);

    // // 当前帖子的ID
    const postIdProp = computed(() => props.postId);

    /**
     * 获取当前帖子的评论列表
     */
    const comments = ref();
    // 当前帖子的评论总数
    const commentsNumber = ref();

    const getComment = async () => {
      await store.dispatch('getComments', postIdProp.value).then(data => {
        commentsNumber.value = data.headers['x-total-count'];
        comments.value = data.data;
      });

      comments.value.map(async (comment: { totalReplies: number; id: number; replyComment: unknown }) => {
        if (comment.totalReplies !== 0) {
          await store.dispatch('getReplyComments', comment.id).then(data => {
            comment.replyComment = data;
          });
        }
      });
    };

    onMounted(() => {
      getComment();
    });

    watch(postIdProp, () => getComment());

    /**
     *  定位到评论所在区域
     */
    const showCommentsCut = computed(() => props.showCommentsCut);
    watch(showCommentsCut, () => {
      if (showCommentsCut.value) {
        setTimeout(() => {
          const comment = document.getElementById('commentAnchor') as HTMLElement;
          comment.scrollIntoView(false);
        }, 100);
      }
    });

    onMounted(() => {
      const StoreShowCommentsCut = computed(() => store.state.showCommentsCut);
      if (StoreShowCommentsCut.value) {
        setTimeout(() => {
          const comment = document.getElementById('commentAnchor') as HTMLElement;
          comment.scrollIntoView(false);
        }, 100);
      }
    });

    /**
     * 发表评论
     */
    const publishCommentVal = ref('');

    const onFormSubmit = (result: boolean) => {
      if (userId.value === -1) {
        createTooltip('请先登录', 'error', 3000);
        return;
      }
      if (result) {
        const publishCommentData = {
          content: publishCommentVal.value,
          postId: postIdProp.value,
        };

        store.dispatch('publishComments', publishCommentData).then(() => {
          publishCommentVal.value = '';
          createTooltip('评论成功', 'success', 3000);
          getComment();
        });
      } else {
        console.log('不通过');
      }
    };

    /**
     * 发表按钮点击控制
     */
    const publishCommentButton = ref(false);
    watch(publishCommentVal, () => {
      if (publishCommentVal.value) {
        publishCommentButton.value = true;
      } else {
        publishCommentButton.value = false;
      }
    });

    /**
     * 监听输入最大字符长度
     * 发表评论
     */
    const publishCommentMax = ref(false);
    watch(publishCommentVal, () => {
      const commentMaximumReg = /^.{0,60}$/;
      if (commentMaximumReg.test(publishCommentVal.value)) {
        publishCommentMax.value = false;
      } else {
        publishCommentButton.value = false;
        publishCommentMax.value = true;
      }
    });

    return {
      postIdProp,
      userId,
      postUserIdProp,
      lostelkUrl,
      comments,
      commentsNumber,
      publishCommentVal,
      onFormSubmit,
      publishCommentButton,
      getComment,
      publishCommentMax,
    };
  },
});
</script>

<style scoped>
@import '../../style/less/componentsStyle/comment.css';
</style>
