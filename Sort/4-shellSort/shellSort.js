function shellSort(arr) {
    let len = arr.length,temp,gap = 1
    // 定义间隔序列，相当于一共len/3组，每组包含3个元素
    while(gap<len/3){
        gap = gap*3+1
    }
    // 减少间隔，直到间隔gap为1，此时的快排就是已经大概完成的
    for(gap;gap>0;gap=Math.floor(gap/3)){
        // 插入排序的实现，间隔是gap
        for(var i = gap;i<len;i++){
            temp = arr[i]
            for(var j = i-gap;j>=0&&arr[j]>temp;j-=gap){
                arr[j+gap]=arr[j]
            }
            arr[j+gap]=temp
        }
    }
    return arr
}

console.log(shellSort([1,3,4,1]))