import { IntervalTime } from '@/utils/utils';
import { ref, computed } from 'vue';
type paramsType = {
    timeCount: number//倒计时时长
    startCallback?: () => void//开始倒计时回调函数
    endCallback?: () => void//开始倒计时回调函数
    initialText?: string//初始化文字
    progressText?: string//倒计时进行中文字
    completeText?: string//结束文字
}
//倒计时
export const useTimerLeft = (params: paramsType = {
    timeCount: 60,
    initialText: '发送验证码',
    progressText: 'S后重新获取',
    completeText: '重新获取'
}
) => {
    const { timeCount, initialText, progressText, completeText, startCallback, endCallback } = params;
    const timerLeft = ref(timeCount);
    const timeText = ref(initialText);
    const isBegin = computed(() => timerLeft.value !== timeCount);
    let timer: any = null;
    const beginTimer = () => {
        if (!isBegin.value) {
            clearInterval(timer);
            startCallback && startCallback();
            timerLeft.value--;
            timeText.value = `${timerLeft.value}` + progressText ?? '';
            timer = setInterval(() => {
                timerLeft.value--;
                timeText.value = `${timerLeft.value}` + progressText ?? '';
                if (timerLeft.value == 0) {
                    endCallback && endCallback();
                    clearInterval(timer);
                    timerLeft.value = timeCount;
                    timeText.value = completeText ?? '';
                }
            }, 1000)
        }
    }
    const revise = () => {
        clearInterval(timer);
        timer = null;
        timerLeft.value = timeCount;
        timeText.value = initialText ?? '';
    }
    //beginTimer 开始倒计时函数
    //revise 重置倒计时函数
    //isBegin 是否在进行倒计时
    // timeText 倒计时秒数
    return { beginTimer, revise, isBegin, timeText }
}

//剩余时间
export const useIntervalTime = (endTime: string) => {
    const timeText = ref('');
    let timer: any = null;
    const beginTimer = () => {
        clearInterval(timer);
        timer = setInterval(() => {
            timeText.value = IntervalTime(endTime)
        }, 1000)
    }
    const revise = () => {
        clearInterval(timer);
        timer = null;
    }
    //beginTimer 开始倒计时函数
    //revise 重置倒计时函数
    return { beginTimer, revise, timeText }
}
type ParameterType = {
    getFn: (params: any) => any,//请求接口函数
    callbackFn?: (list: any[]) => any[],//处理接口返回的数据，参数是接口返回的数组数据，需返回处理好的数据，
    params?: any,
    pageNumber?: number
    pageSize?: number
    listKey?: string
    upLoading?: boolean
}
//分页接口封装Hook
export const useListData = <T>({
    pageNumber = 1,
    pageSize = 20,
    params,
    getFn,
    callbackFn,
    listKey = 'list',
    upLoading = true
}: ParameterType) => {
    const paramsData = reactive<any>({
        pageNumber,
        pageSize,
        total: 0
    })
    const parameter = ref<any>({
        pageNumber,
        pageSize,
        ...params,
    })
    const list = ref<T[]>([]);
    const getData = async (trendsFn?: (params: any) => any) => {
        let data;
        if (trendsFn) {
            const res = await trendsFn(parameter.value);
            data = res.data
        } else {
            const res = await getFn(parameter.value);
            data = res.data
        }
        try {
            let _list = data[listKey]
            if (callbackFn) {
                _list = callbackFn(_list);
            }
            if (data.pageNumber == 1) {
                list.value = _list;
            } else {
                list.value = list.value.concat(
                    _list
                );
            }
            paramsData.pageNumber = data.pageNumber;
            paramsData.pageSize = data.pageSize;
            paramsData.total = data.total;
            paramsData.pendingNewNumber = data?.pendingNewNumber ?? 0;
            return data;
        } catch {
            console.log('接口错误')
        }

    }
    const setParams = (data: any) => {
        parameter.value = { ...parameter.value, ...data }
    }
    const loadmore = () => {
        if (list.value.length < paramsData.total && upLoading) {
            parameter.value.pageNumber += 1;
            getData();
        }
    };
    //重置到第一页
    const resetData = () => {
        parameter.value = { ...parameter.value, pageSize, pageNumber: 1 };
        paramsData.pageNumber = 1;
    };
    onReachBottom(loadmore);
    /*
    loadmore 请求下页函数
    getData 请求当前页函数
    resetData 重置请求
    setParams 设置请求参数
    list 数据
    paramsData 当前页数，总数，每页数量
    */
    return { getData, loadmore, resetData, setParams, list, paramsData }
}