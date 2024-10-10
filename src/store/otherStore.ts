// @ts-ignore
import type { child } from '@/pages/home/complaint/complaint_page/index.vue';
// @ts-ignore
import type { ListType } from '@/pages_my/my_complaint/index.vue';
import { defineStore } from 'pinia';

export const useComplaint = defineStore('ComplaintData', () => {
	const data = ref<ListType>();
	return {
		data,
	};
});
export const useOtherData = defineStore('OtherData', () => {
	const url = ref<string | null>(null);
	const key = ref<string | null>(null);
	const iv = ref<string | null>(null);

	return {
		url,
		key,
		iv,
	};
});
export const useReportData = defineStore('ReportData', () => {
	const data = ref<child>();
	return {
		data,
	};
});

export const useThemeData = defineStore('ThemeData', () => {
	const data = ref<any>(null);
	const spaBriefIntroduction = ref<any>(null);
	return {
		data,
		spaBriefIntroduction,
	};
});
