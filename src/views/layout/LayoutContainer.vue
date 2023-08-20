<script setup>
import { Menu, Aim, View, List, Edit, UserFilled, User, EditPen, SwitchButton, CaretBottom } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
	userStore.getUser();
});

const handleCommand = async (key) => {
	if (key === 'logout') {
		// 退出操作
		await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
			type: 'warning',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
		});

		// 清除本地的数据 (token + user信息)
		userStore.removeToken();
		userStore.setUser({});
		router.push('/login');
	} else {
		// 跳转操作
		router.push(`/user/${key}`);
	}
};
</script>

<template>
	<el-container class="layout-container">
		<el-aside width="200px">
			<div class="el-aside__logo"></div>
			<el-menu :default-active="$route.path" router>
				<el-sub-menu index="/pm">
					<template #title>
						<el-icon>
							<Menu />
						</el-icon>
						<span>PM管理</span>
					</template>
					<el-menu-item index="/pm/push">
						<el-icon>
							<Aim />
						</el-icon>
						<span>PM推送</span>
					</el-menu-item>
					<el-menu-item index="/pm/status">
						<el-icon>
							<List />
						</el-icon>
						<span>PM状态</span>
					</el-menu-item>
					<el-menu-item index="/pm/modify">
						<el-icon>
							<Edit />
						</el-icon>
						<span>PM更改</span>
					</el-menu-item>
					<el-menu-item index="/pm/record">
						<el-icon>
							<View />
						</el-icon>
						<span>PM更改记录</span>
					</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="/user">
					<!-- 多级菜单的标题 - 具名插槽 title -->
					<template #title>
						<el-icon>
							<UserFilled />
						</el-icon>
						<span>个人中心</span>
					</template>

					<!-- 展开的内容 - 默认插槽 -->
					<el-menu-item index="/user/profile">
						<el-icon>
							<User />
						</el-icon>
						<span>基本资料</span>
					</el-menu-item>
					<el-menu-item index="/user/password">
						<el-icon>
							<EditPen />
						</el-icon>
						<span>重置密码</span>
					</el-menu-item>
				</el-sub-menu>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header>
				<div>
					用户：<strong>{{ userStore.user.nickname || userStore.user.username }}</strong>
				</div>
				<el-dropdown placement="bottom-end" @command="handleCommand">
					<!-- 展示给用户，默认看到的 -->
					<span class="el-dropdown__box">
						<el-icon :size="25">
							<User></User>
						</el-icon>
						<el-icon>
							<CaretBottom />
						</el-icon>
					</span>

					<!-- 折叠的下拉部分 -->
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
							<el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
							<el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer>PM ©2023</el-footer>
		</el-container>
	</el-container>
</template>

<style lang="scss" scoped>
.layout-container {
	height: 100vh;

	.el-aside {
		background-color: rgb(255, 255, 255);

		.el-menu {
			background-color: rgb(255, 255, 255);
			border-radius: 0px;
			border-top: 0.3px solid #ababcb;
			padding: 5px;
		}

		&__logo {
			height: 100px;
			background: url('@/assets/logo.png') no-repeat center / 100px auto;
		}

		.el-menu-item {
			background-color: rgb(255, 255, 255);
		}

		.el-menu-item:hover {
			outline: 0;
			background-color: #96a1ca;
			border-radius: 10px;
		}
		.el-menu-item.is-active {
			color: #085de6;

			border-radius: 10px;
		}
	}

	.el-header {
		background-color: rgb(254, 254, 254);
		display: flex;
		align-items: center;
		justify-content: space-between;

		.el-dropdown__box {
			background-color: rgb(254, 254, 254);
			display: flex;
			align-items: center;

			.el-icon {
				color: #999;
				margin-left: 10px;
			}

			&:active,
			&:focus {
				outline: none;
			}
		}
	}

	.el-footer {
		height: auto;
		background-color: rgb(254, 254, 254);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #666;
	}
}
</style>
