<template>
  <Header :user="loginJudge"></Header>
  <div class="clause">
    <h1>隐私政策</h1>
    <h4>
      LostElk
      致力于保护您的隐私并保护您的个人信息。本隐私政策（“隐私政策”）的目的是向您介绍我们的隐私惯例，包括我们如何收集，使用和披露您的个人信息。
    </h4>
    <h4>
      本隐私政策适用于我们的网站，移动应用程序和相关服务。通过访问，访问或使用LostElk服务，即表示您同意本隐私政策的政策和惯例，因此请仔细阅读它们。如果您不接受本隐私政策的任何政策或惯例，请不要访问，访问或使用LostElk服务。
    </h4>
    <h4>我们收集的个人信息</h4>
    <p>
      A.帐户资料–当您开设一个帐户时，我们可能会收集您的名字，姓氏，电子邮件地址，用户名和密码。您还可以在帐户资料中提供其他详细信息，例如您的资料图片，照片，位置数据，个人网站等
    </p>
    <p>
      B.设备信息–自动收集有关您设备的信息，例如硬件，相机,操作系统，浏览器等。适用的法律依据：合法权益（允许我们在网站上提供内容和服务），同意，合同履行；
    </p>
    <p>
      C.服务器日志信息–您使用LostElk
      Services生成的信息，该信息会自动收集并存储在我们的服务器日志中。这可能包括但不限于特定于设备的信息，位置信息，系统活动以及与您访问的“未启动”页面有关的任何内部和外部信息。适用法律依据：合法权益（允许我们在网站上提供内容和服务），同意，合同履行；
    </p>
    <p>
      D.通讯–您以通讯方式提供给我们的信息，例如您提交问题或查询时以及与持续的客户支持有关的信息。适用的法律依据：合法权益（使我们能够履行义务并提供服务），同意，履行合同。
    </p>
    <h4>信息安全</h4>
    <p>
      我们非常重视您的隐私，并已采取物理，组织和技术安全措施，以防止您的个人信息丢失或被盗，未经授权的访问，披露，复制，使用或修改。我们的数据库在必要的基础上限制访问您的信息。
      尽管采取了上述措施，但是信息传输或信息存储的任何方法都不是100％安全或无错误的，因此很遗憾，我们不能保证绝对的安全性。如果您有理由认为与我们的互动不再安全（例如，如果您认为您提供给我们的任何信息的安全性受到损害），请立即发送邮箱(32030954@qq.com)与我们联系。
    </p>
    <h4>联系我们</h4>
    <p>
      联系我们
      对本隐私政策或您的个人信息有任何疑问或意见，提出访问或更正请求，行使任何适用的权利，提出投诉等可以通过32030954@qq.com与我们联系。
    </p>
    <h4>本隐私政策的最新更新时间为2021年4月28日。</h4>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Header from '../components/header/HeaderBox.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
  },
  props: {
    cardColumn: Number,
  },
  setup() {
    const store = useStore();

    // 进行登陆判断
    const loginJudge = computed(() => {
      return store.state.user;
    });

    return {
      loginJudge,
    };
  },
});
</script>

<style scoped>
@import '../style/less/viewsStyle/clause.css';
</style>
