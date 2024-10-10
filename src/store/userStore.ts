import { jumpLogin } from '@/utils/utils';
import { defineStore } from 'pinia';
import type { Role, UserInfo, UserMsg } from 'typings/user';
import { Decrypt, Encrypt } from '@/utils/secrypt';
export const useUserInfo = defineStore('userInfo', () => {
	const role = ref<Role[] | null>(null);
	const userInfo = ref<UserInfo | null>(null);
	const token = ref<string | null>(null);
	const userMsg = ref<UserMsg | null>(null);
	const setUser = (userInfos: UserInfo | null) => {
		userInfo.value = userInfos;
		uni.setStorageSync('userInfo', Encrypt(JSON.stringify(userInfos)));
	};
	const setUserMsg = (userMsgs: UserMsg) => {
		userMsg.value = userMsgs;
		uni.setStorageSync('userMsg', Encrypt(JSON.stringify(userMsgs)));
	};
	const setRole = (roles: Role[]) => {
		role.value = roles;
		uni.setStorageSync('role', Encrypt(JSON.stringify(roles)));
	};
	const setToken = (tokens: string) => {
		token.value = tokens;
		uni.setStorageSync('token', Encrypt(JSON.stringify(tokens)));
	};
	const getRole = () => {
		const storage = uni.getStorageSync('role');
		role.value = storage ? JSON.parse(Decrypt(storage)) : null;
		return role.value;
	};
	const getUser = () => {
		const storage = uni.getStorageSync('userInfo');
		userInfo.value = storage ? JSON.parse(Decrypt(storage)) : null;
		return userInfo.value;
	};
	const getUserMsg = () => {
		const storage = uni.getStorageSync('userMsg');
		userMsg.value = storage ? JSON.parse(Decrypt(storage)) : null;
		return userMsg.value;
	};
	const getToken = (isJump = false) => {
		let storage = uni.getStorageSync('token');
		if (!storage && isJump) {
			jumpLogin();
			return false;
		}
		token.value = storage && JSON.parse(Decrypt(storage));
		return token.value;
	};
	const removeUser = () => {
		['token', 'role', 'userInfo', 'userMsg'].forEach(item => {
			uni.removeStorageSync(item);
		});
		role.value = null;
		userInfo.value = null;
		token.value = null;
		userMsg.value = null;
	};
	const initialization = () => {
		getRole();
		getUser();
		getToken();
	};
	return {
		role,
		userInfo,
		token,
		userMsg,
		setUser,
		setRole,
		setToken,
		setUserMsg,
		getRole,
		getUser,
		getToken,
		removeUser,
		getUserMsg,
		initialization,
	};
});
